import React from "react";
import { useDnD } from "./DnDContext";

const components = [
    { name: "WebClientNode", iconDirectory: "/assets/web-client.png" },
    { name: "ServerNode", iconDirectory: "/assets/server.png" },
];

const ComponentMenu = () => {
  const [_, setType] = useDnD();

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    componentName: string
  ) => {
    if (setType) {
      setType(componentName);
    }
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      style={{
        height: "100%",
        width: "25vw",
        backgroundColor: "gray",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <aside>
        {components.map((component) => (
          <ComponentMenuItem
            key={component.name}
            componentName={component.name}
            iconDirectory={component.iconDirectory}
            onDragStart={onDragStart}
          />
        ))}
      </aside>
    </div>
  );
};

type ComponentMenuItemProps = {
  componentName: string;
  iconDirectory: string;
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => void;
};

const ComponentMenuItem = ({
  componentName,
  iconDirectory,
  onDragStart,
}: ComponentMenuItemProps) => {
  return (
    <div
      onDragStart={(event) => onDragStart(event, componentName)}
      draggable
      style={{
        width: "200px",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
        margin: "10px",
        backgroundColor: "white",
      }}
    >
      <img
        src={iconDirectory}    
        alt={componentName}
        style={{ width: "100px", height: "100px", marginBottom: "10px" }}
      />
      <span>{componentName}</span>
    </div>
  );
};

export default ComponentMenu;
