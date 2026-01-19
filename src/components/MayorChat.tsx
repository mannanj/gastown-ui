"use client";

import { useRef, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { MayorMessage } from "@/hooks/useMayor";

interface MayorChatProps {
  messages: MayorMessage[];
  connected: boolean;
  onSendCommand: (command: string) => void;
}

export function MayorChat({ messages, connected, onSendCommand }: MayorChatProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendCommand(input.trim());
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full border-b border-border">
      <div className="px-4 py-2 border-b border-border flex items-center justify-between">
        <span className="text-sm font-medium">Mayor</span>
        <span className="text-xs text-muted-foreground">
          {connected ? "● connected" : "○ disconnected"}
        </span>
      </div>
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-1 text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={
                msg.type === "input"
                  ? "text-muted-foreground"
                  : msg.type === "system"
                  ? "text-muted-foreground italic"
                  : ""
              }
            >
              <span className="text-muted-foreground text-xs mr-2">
                {msg.timestamp.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
              </span>
              {msg.content}
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-2 border-t border-border">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={connected ? "Enter command..." : "Connecting..."}
          disabled={!connected}
          className="bg-transparent border-border text-sm"
        />
      </form>
    </div>
  );
}
