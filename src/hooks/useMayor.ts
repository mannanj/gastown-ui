"use client";

import { useState, useEffect, useCallback } from "react";

export interface MayorMessage {
  id: string;
  timestamp: Date;
  content: string;
  type: "system" | "output" | "input";
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

// Mock data - replace with real mayor attach later
const mockRigs: Rig[] = [
  { name: "aurum", polecats: 4, status: "Active" },
  { name: "domain_hunt", polecats: 1, status: "Active" },
  { name: "calendar", polecats: 0, status: "Idle" },
];

const mockAgents: Agent[] = [
  { name: "aurum-witness", activity: "3m ago", status: "ok" },
  { name: "aurum-refinery", activity: "19m ago", status: "nudged" },
  { name: "domain_hunt-witness", activity: "13m ago", status: "ok" },
  { name: "domain_hunt-refinery", activity: "12m ago", status: "ok" },
];

const mockActiveWork: ActiveWork[] = [
  { rig: "aurum", polecat: "rictus", task: "au-mxhf E2E Test", activity: "0m ago" },
  { rig: "domain_hunt", polecat: "furiosa", task: "dh-7t6 Domain Script", activity: "1m ago" },
];

const mockCompleted = ["au-ww71 - Bug fix (NextJS error + size preservation)"];

export function useMayor() {
  const [state, setState] = useState<MayorState>({
    connected: false,
    messages: [],
    rigs: [],
    agents: [],
    activeWork: [],
    completed: [],
  });

  useEffect(() => {
    // Simulate connection
    const connectTimeout = setTimeout(() => {
      setState((prev) => ({
        ...prev,
        connected: true,
        rigs: mockRigs,
        agents: mockAgents,
        activeWork: mockActiveWork,
        completed: mockCompleted,
        messages: [
          {
            id: "1",
            timestamp: new Date(),
            content: "Mayor attached. Streaming status...",
            type: "system",
          },
          {
            id: "2",
            timestamp: new Date(),
            content: "Status Summary",
            type: "output",
          },
          {
            id: "3",
            timestamp: new Date(),
            content: "Rigs: aurum (4 polecats, Active), domain_hunt (1 polecat, Active), calendar (0 polecats, Idle)",
            type: "output",
          },
        ],
      }));
    }, 500);

    // Simulate periodic updates
    const updateInterval = setInterval(() => {
      const updates = [
        "aurum-witness checking task progress...",
        "domain_hunt-refinery processing batch...",
        "Task au-mxhf completed step 3/5",
        "New bead assigned to rictus",
        "calendar rig idle, awaiting tasks",
      ];
      const randomUpdate = updates[Math.floor(Math.random() * updates.length)];

      setState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: Date.now().toString(),
            timestamp: new Date(),
            content: randomUpdate,
            type: "output",
          },
        ],
      }));
    }, 5000);

    return () => {
      clearTimeout(connectTimeout);
      clearInterval(updateInterval);
    };
  }, []);

  const sendCommand = useCallback((command: string) => {
    setState((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          id: Date.now().toString(),
          timestamp: new Date(),
          content: `> ${command}`,
          type: "input",
        },
      ],
    }));

    // Simulate response
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: (Date.now() + 1).toString(),
            timestamp: new Date(),
            content: `Command received: ${command}`,
            type: "output",
          },
        ],
      }));
    }, 200);
  }, []);

  return { state, sendCommand };
}
