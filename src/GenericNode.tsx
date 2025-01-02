import { Handle, Position } from "@xyflow/react";
import * as changeCase from "change-case";
import { useState } from "react";

type GenericNodeProps = {
  data: {
    name: string; //kebab-case
  };
};

export const GenericNode = ({ data }: GenericNodeProps) => {
  const [text, setText] = useState(changeCase.capitalCase(data.name));

  return (
    <div
      style={{
        textAlign: "center",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img
        src={`assets/${data.name}.png`}
        alt={changeCase.capitalCase(data.name)}
        style={{ width: "50px", height: "50px", objectFit: "cover" }}
      />
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
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};
