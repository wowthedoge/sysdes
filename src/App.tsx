import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  MarkerType,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { AnimatedEdge, AnimatedEdgeNode } from "./AnimatedEdge";
import { ServerNode } from "./ServerNode";
import { WebClientNode } from "./WebClientNode";
import ComponentMenu from "./ComponentMenu";
import { DnDProvider, useDnD } from "./DnDContext";
import { GenericNode } from "./GenericNode";
import TextInputEdge from "./TextInputEdge";

const nodeTypes = { GenericNode, AnimatedEdgeNode };
const initialNodes: Node[] = [];

const edgeTypes = { AnimatedEdge, TextInputEdge };
const initialEdges: Edge[] = [];

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  //       addEdge(
  //         {
  //           id: `${params.source}->${params.target}`,
  //           source: params.source,
  //           target: params.target,
  //           type: "AnimatedEdge",
  //         },
  //         eds
  //       )
  //     );
  //     setNodes((nds) =>
  //       nds.concat({
  //         id: `${params.source}->${params.target}`,
  //         type: "AnimatedEdgeNode",
  //         position: { x: 0, y: 0 },
  //         style: { visibility: "hidden" },
  //         data: { text: "HTTP GET" },
  //       })
  //     );
  //   },
  //   [setEdges]
  // );

  const onConnect = useCallback(
    (params: any) => {
      setEdges((eds) =>
        addEdge(
          {
            id: `${params.source}->${params.target}`,
            source: params.source,
            target: params.target,
            // markerEnd: {
            //   type: MarkerType.ArrowClosed,
            //   width: 10,
            //   height: 10,
            //   color: '#000',
            // },
            type: "TextInputEdge",
            // style: {
            //   strokeWidth: 2,
            //   stroke: '#000',
            // },
          },
          eds
        )
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
        type: "GenericNode",
        position,
        data: { name: type },
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

