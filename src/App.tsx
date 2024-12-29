import React, { useCallback, useEffect, useMemo, useRef } from "react";
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
  ReactFlowProvider,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { AnimatedEdge, AnimatedEdgeNode } from "./AnimatedEdge";
import { ServerNode } from "./ServerNode";
import { WebClientNode } from "./WebClientNode";
import ComponentMenu from "./ComponentMenu";
import { DnDProvider, useDnD } from "./DnDContext";

const nodeTypes = { WebClientNode, ServerNode, AnimatedEdgeNode };
const initialNodes: Node[] = [
  {
    id: `WebClientNode${Date.now()}`,
    type: "WebClientNode",
    position: { x: 200, y: 400 },
    data: {},
  },
  {
    id: `ServerNode${Date.now()}`,
    type: "ServerNode",
    position: { x: 500, y: 400 },
    data: {},
  },
];

const edgeTypes = { AnimatedEdge };
const initialEdges: Edge[] = [];

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

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
      setNodes((nds) =>
        nds.concat({
          id: `${params.source}->${params.target}`,
          type: "AnimatedEdgeNode",
          position: { x: 0, y: 0 },
          style: { visibility: "hidden" },
          data: { text: "HTTP GET" },
        })
      );
    },
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: type + Date.now(),
        type,
        position,
        data: {},
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#F7F9FB" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
        ref={reactFlowWrapper}
      >
        <ComponentMenu />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onDrop={onDrop}
          onDragOver={onDragOver}
          // colorMode="dark"
        >
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <App />
    </DnDProvider>
  </ReactFlowProvider>
);
