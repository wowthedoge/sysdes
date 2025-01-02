import React from "react";
import { useDnD } from "./DnDContext";
import * as changeCase from "change-case";

const components = [
  { name: "web-client", iconDirectory: "/assets/web-client.png" },
  { name: "server", iconDirectory: "/assets/server.png" },
  { name: "cache", iconDirectory: "/assets/cache.png" },
  { name: "database", iconDirectory: "/assets/database.png" },
  { name: "load-balancer", iconDirectory: "/assets/load-balancer.png" },
  { name: "message-queue", iconDirectory: "/assets/message-queue.png" },
  { name: "mobile-client", iconDirectory: "/assets/mobile-client.png" },
  { name: "service", iconDirectory: "/assets/service.png" },
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
        width: "100px",
        height: "100px",
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
        alt={changeCase.capitalCase(componentName)}
        style={{ width: "50px", height: "50px", marginBottom: "10px" }}
      />
      <span style={{fontSize: '10px'}}>{componentName}</span>
    </div>
  );
};

export default ComponentMenu;
