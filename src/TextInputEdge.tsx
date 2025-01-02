import React, { useState } from "react";
import {
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
  type EdgeProps,
} from "@xyflow/react";

const TextInputEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [text, setText] = useState("    ");

  return (
    <>
      <BaseEdge id={id} path={edgePath}  />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            borderRadius: 5,
            fontSize: 12,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              border: "none",
              background: "transparent",
              width: `${text.length}ch`,
            }}
          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default TextInputEdge;

const TextInput = () => {
  const [text, setText] = useState("HELLO");
  return (
    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
  );
};
