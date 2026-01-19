"use client";

import { Panel } from "./Panel";
import { Rig, ActiveWork } from "@/hooks/useMayor";

interface RigsPanelProps {
  rigs: Rig[];
  activeWork: ActiveWork[];
  completed: string[];
}

export function RigsPanel({ rigs, activeWork, completed }: RigsPanelProps) {
  return (
    <Panel title="Rigs">
      <div className="space-y-4 text-sm">
        <div>
          <div className="text-xs text-muted-foreground mb-2">Rigs</div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-1 font-medium">Rig</th>
                <th className="pb-1 font-medium">Polecats</th>
                <th className="pb-1 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rigs.map((rig) => (
                <tr key={rig.name} className="border-b border-border/50">
                  <td className="py-1">{rig.name}</td>
                  <td className="py-1">{rig.polecats}</td>
                  <td className="py-1">{rig.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <div className="text-xs text-muted-foreground mb-2">Active Work</div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-1 font-medium">Rig</th>
                <th className="pb-1 font-medium">Polecat</th>
                <th className="pb-1 font-medium">Task</th>
                <th className="pb-1 font-medium">Activity</th>
              </tr>
            </thead>
            <tbody>
              {activeWork.map((work, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-1">{work.rig}</td>
                  <td className="py-1">{work.polecat}</td>
                  <td className="py-1">{work.task}</td>
                  <td className="py-1">{work.activity} ✓</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <div className="text-xs text-muted-foreground mb-2">Completed This Session</div>
          <ul className="space-y-1">
            {completed.map((item, i) => (
              <li key={i}>✓ {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  );
}
