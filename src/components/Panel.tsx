"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface PanelProps {
  title: string;
  children: React.ReactNode;
}

export function Panel({ title, children }: PanelProps) {
  const [expanded, setExpanded] = useState(false);

  if (expanded) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col">
        <div className="px-4 py-2 border-b border-border flex items-center justify-between">
          <span className="text-sm font-medium">{title}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(false)}
            className="text-xs h-6 px-2"
          >
            ✕ close
          </Button>
        </div>
        <ScrollArea className="flex-1 p-4">{children}</ScrollArea>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full border-border">
      <div className="px-4 py-2 border-b border-border flex items-center justify-between">
        <span className="text-sm font-medium">{title}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(true)}
          className="text-xs h-6 px-2"
        >
          ↗ expand
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4">{children}</ScrollArea>
    </div>
  );
}
