import { spawn, ChildProcess } from "child_process";

// Store the mayor process globally so we can send commands to it
let mayorProcess: ChildProcess | null = null;

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Path to mayor - configure via env or use default
      const mayorPath = process.env.MAYOR_PATH || "mayor";
      const mayorArgs = process.env.MAYOR_ARGS?.split(" ") || ["attach"];

      try {
        mayorProcess = spawn(mayorPath, mayorArgs, {
          stdio: ["pipe", "pipe", "pipe"],
          shell: true,
        });

        const send = (type: string, data: string) => {
          const message = JSON.stringify({ type, data, timestamp: Date.now() });
          controller.enqueue(encoder.encode(`data: ${message}\n\n`));
        };

        send("system", "Connecting to mayor...");

        mayorProcess.stdout?.on("data", (data: Buffer) => {
          const lines = data.toString().split("\n").filter(Boolean);
          for (const line of lines) {
            send("output", line);
          }
        });

        mayorProcess.stderr?.on("data", (data: Buffer) => {
          const lines = data.toString().split("\n").filter(Boolean);
          for (const line of lines) {
            send("error", line);
          }
        });

        mayorProcess.on("close", (code) => {
          send("system", `Mayor process exited with code ${code}`);
          mayorProcess = null;
          controller.close();
        });

        mayorProcess.on("error", (err) => {
          send("error", `Failed to start mayor: ${err.message}`);
          mayorProcess = null;
          controller.close();
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "error", data: `Failed to spawn mayor: ${errorMessage}`, timestamp: Date.now() })}\n\n`
          )
        );
        controller.close();
      }
    },
    cancel() {
      if (mayorProcess) {
        mayorProcess.kill();
        mayorProcess = null;
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function POST(request: Request) {
  const { command } = await request.json();

  if (!mayorProcess || !mayorProcess.stdin) {
    return Response.json(
      { error: "Mayor not connected" },
      { status: 503 }
    );
  }

  try {
    mayorProcess.stdin.write(command + "\n");
    return Response.json({ ok: true });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return Response.json(
      { error: `Failed to send command: ${errorMessage}` },
      { status: 500 }
    );
  }
}
