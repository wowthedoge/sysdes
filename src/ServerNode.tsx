import { Handle, Position } from "@xyflow/react";

export const ServerNode = () => {
    return (
      <div style={{ textAlign: 'center', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <img
          src="/assets/server.png"
          alt="Server"
          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
        />
        <div>Server</div>
        <Handle type="target" position={Position.Left} />
      </div>
    );
  };
