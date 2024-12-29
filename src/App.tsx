import React, { useCallback, useEffect, useMemo } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  Node,
  Edge,
  Background,
  BaseEdge,
  EdgeProps,
  getSmoothStepPath,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { AnimatedEdge, AnimatedEdgeNode } from "./AnimatedEdge";
import { ServerNode } from "./ServerNode";
import { WebClientNode } from "./WebClientNode";

const nodeTypes = { WebClientNode, ServerNode, AnimatedEdgeNode };
const initialNodes: Node[] = [
  { id: "1", type: "WebClientNode", position: { x: 200, y: 400 }, data: {} },
  { id: "2", type: "ServerNode", position: { x: 500, y: 400 }, data: {} },
];

const edgeTypes = { AnimatedEdge };
const initialEdges: Edge[] = [];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => {
      setEdges((eds) =>
        addEdge(
          {
            id: `${params.source}->${params.target}`,
            source: params.source,
            target: params.target,
            type: "AnimatedEdge",
          },
          eds
        )
      );
      setNodes((nds) => [
        ...nds,
        {
          id: "1->2",
          type: "AnimatedEdgeNode",
          position: { x: 0, y: 0 },
          style: { visibility: "hidden" },
          data: { text: "HTTP GET" },
        },
      ]);
    },
    [setEdges]
  );

  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#F7F9FB" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
