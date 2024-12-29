import { Handle, Position } from "@xyflow/react";

export const WebClientNode = () => {
    return (
      <div style={{ textAlign: 'center', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <img
          src="/assets/web-client.png"
          alt="Web Client"
          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
        />
        <div>Web Client</div>
        <Handle type="source" position={Position.Right} />
      </div>
    );
  };
  