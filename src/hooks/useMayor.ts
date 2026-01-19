"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface MayorMessage {
  id: string;
  timestamp: Date;
  content: string;
  type: "system" | "output" | "error" | "input";
}

export interface Rig {
  name: string;
  polecats: number;
  status: "Active" | "Idle";
}

export interface Agent {
  name: string;
  activity: string;
  status: "ok" | "nudged";
}

export interface ActiveWork {
  rig: string;
  polecat: string;
  task: string;
  activity: string;
}

export interface MayorState {
  connected: boolean;
  messages: MayorMessage[];
  rigs: Rig[];
  agents: Agent[];
  activeWork: ActiveWork[];
  completed: string[];
}

// Parse mayor output to extract structured data
function parseRigsFromOutput(lines: string[]): Rig[] {
  const rigs: Rig[] = [];
  let inRigsSection = false;

  for (const line of lines) {
    if (line.includes("Rigs") && !line.includes("Rigs:")) {
      inRigsSection = true;
      continue;
    }
    if (inRigsSection && line.includes("Infrastructure Health")) {
      break;
    }
    if (inRigsSection) {
      // Parse table rows like: | aurum | 4 | Active |
      const match = line.match(/\|\s*(\w+)\s*\|\s*(\d+)\s*\|\s*(Active|Idle)\s*\|/);
      if (match) {
        rigs.push({
          name: match[1],
          polecats: parseInt(match[2], 10),
          status: match[3] as "Active" | "Idle",
        });
      }
    }
  }
  return rigs;
}

function parseAgentsFromOutput(lines: string[]): Agent[] {
  const agents: Agent[] = [];
  let inAgentsSection = false;

  for (const line of lines) {
    if (line.includes("Infrastructure Health")) {
      inAgentsSection = true;
      continue;
    }
    if (inAgentsSection && line.includes("Active Work")) {
      break;
    }
    if (inAgentsSection) {
      // Parse table rows like: | aurum-witness | 3m ago | ✅ |
      const match = line.match(/\|\s*([\w-]+)\s*\|\s*(\d+m ago)\s*\|\s*([✅✓])\s*(\(nudged\))?\s*\|/);
      if (match) {
        agents.push({
          name: match[1],
          activity: match[2],
          status: match[4] ? "nudged" : "ok",
        });
      }
    }
  }
  return agents;
}

function parseActiveWorkFromOutput(lines: string[]): ActiveWork[] {
  const work: ActiveWork[] = [];
  let inWorkSection = false;

  for (const line of lines) {
    if (line.includes("Active Work")) {
      inWorkSection = true;
      continue;
    }
    if (inWorkSection && line.includes("Completed")) {
      break;
    }
    if (inWorkSection) {
      // Parse table rows
      const match = line.match(/\|\s*(\w+)\s*\|\s*(\w+)\s*\|\s*(.+?)\s*\|\s*(\d+m ago)\s*[✅✓]?\s*\|/);
      if (match) {
        work.push({
          rig: match[1],
          polecat: match[2],
          task: match[3].trim(),
          activity: match[4],
        });
      }
    }
  }
  return work;
}

function parseCompletedFromOutput(lines: string[]): string[] {
  const completed: string[] = [];
  let inCompletedSection = false;

  for (const line of lines) {
    if (line.includes("Completed This Session")) {
      inCompletedSection = true;
      continue;
    }
    if (inCompletedSection) {
      const match = line.match(/[✅✓-]\s*(.+)/);
      if (match) {
        completed.push(match[1].trim());
      }
    }
  }
  return completed;
}

export function useMayor() {
  const [state, setState] = useState<MayorState>({
    connected: false,
    messages: [],
    rigs: [],
    agents: [],
    activeWork: [],
    completed: [],
  });

  const outputBuffer = useRef<string[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const eventSource = new EventSource("/api/mayor");
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      setState((prev) => ({ ...prev, connected: true }));
    };

    eventSource.onmessage = (event) => {
      try {
        const { type, data, timestamp } = JSON.parse(event.data);

        // Add to message list
        const newMessage: MayorMessage = {
          id: `${timestamp}-${Math.random()}`,
          timestamp: new Date(timestamp),
          content: data,
          type: type as MayorMessage["type"],
        };

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, newMessage],
        }));

        // Buffer output for parsing
        if (type === "output") {
          outputBuffer.current.push(data);

          // Try to parse structured data from buffered output
          const rigs = parseRigsFromOutput(outputBuffer.current);
          const agents = parseAgentsFromOutput(outputBuffer.current);
          const activeWork = parseActiveWorkFromOutput(outputBuffer.current);
          const completed = parseCompletedFromOutput(outputBuffer.current);

          if (rigs.length > 0 || agents.length > 0 || activeWork.length > 0 || completed.length > 0) {
            setState((prev) => ({
              ...prev,
              rigs: rigs.length > 0 ? rigs : prev.rigs,
              agents: agents.length > 0 ? agents : prev.agents,
              activeWork: activeWork.length > 0 ? activeWork : prev.activeWork,
              completed: completed.length > 0 ? completed : prev.completed,
            }));
          }
        }
      } catch (err) {
        console.error("Failed to parse SSE message:", err);
      }
    };

    eventSource.onerror = () => {
      setState((prev) => ({ ...prev, connected: false }));
    };

    return () => {
      eventSource.close();
      eventSourceRef.current = null;
    };
  }, []);

  const sendCommand = useCallback(async (command: string) => {
    // Add command to messages immediately
    setState((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          id: `input-${Date.now()}`,
          timestamp: new Date(),
          content: `> ${command}`,
          type: "input",
        },
      ],
    }));

    try {
      const response = await fetch("/api/mayor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        setState((prev) => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: `error-${Date.now()}`,
              timestamp: new Date(),
              content: error || "Failed to send command",
              type: "error",
            },
          ],
        }));
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: `error-${Date.now()}`,
            timestamp: new Date(),
            content: "Failed to send command",
            type: "error",
          },
        ],
      }));
    }
  }, []);

  return { state, sendCommand };
}
