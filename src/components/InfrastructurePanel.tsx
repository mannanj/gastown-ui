"use client";

import { Panel } from "./Panel";
import { Agent } from "@/hooks/useMayor";

interface InfrastructurePanelProps {
  agents: Agent[];
}

export function InfrastructurePanel({ agents }: InfrastructurePanelProps) {
  return (
    <Panel title="Infrastructure Health">
      <div className="text-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-1 font-medium">Agent</th>
              <th className="pb-1 font-medium">Activity</th>
              <th className="pb-1 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.name} className="border-b border-border/50">
                <td className="py-1">{agent.name}</td>
                <td className="py-1">{agent.activity}</td>
                <td className="py-1">
                  {agent.status === "ok" ? "✓" : "✓ (nudged)"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
