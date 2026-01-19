"use client";

import { useMayor } from "@/hooks/useMayor";
import { MayorChat } from "@/components/MayorChat";
import { RigsPanel } from "@/components/RigsPanel";
import { InfrastructurePanel } from "@/components/InfrastructurePanel";

export default function Home() {
  const { state, sendCommand } = useMayor();

  return (
    <div className="h-full flex flex-col">
      {/* Top half - Mayor chat */}
      <div className="h-1/2 min-h-0">
        <MayorChat
          messages={state.messages}
          connected={state.connected}
          onSendCommand={sendCommand}
        />
      </div>

      {/* Bottom half - Panels */}
      <div className="h-1/2 min-h-0 flex">
        <div className="w-1/2 border-r border-border">
          <RigsPanel
            rigs={state.rigs}
            activeWork={state.activeWork}
            completed={state.completed}
          />
        </div>
        <div className="w-1/2">
          <InfrastructurePanel agents={state.agents} />
        </div>
      </div>
    </div>
  );
}
