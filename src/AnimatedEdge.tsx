import { EdgeProps, getBezierPath, BaseEdge, Edge, Node } from "@xyflow/react";
import { useMemo, useEffect } from "react";

export type AnimatedEdgeType = Edge<
  { node: string; text: string },
  "animatedNode"
>;

const nodeSpeed = 1500;

export const AnimatedEdge = ({
  id,
  data = { node: id, text: "" },
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps<AnimatedEdgeType>) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const selector = useMemo(() => `.react-flow__node[data-id="${id}"]`, [id]);

  useEffect(() => {
    const node = document.querySelector(selector) as HTMLElement;
    const text = document.getElementById(`${id}text`);
    if (!node || !text) return;

    const animateNode = () => {
      node.style.offsetPath = `path('${edgePath}')`;
      node.style.offsetRotate = "0deg";
      node.style.offsetAnchor = "center";

      const keyframes = [{ offsetDistance: "0%" }, { offsetDistance: "100%" }];
      const animation = node.animate(keyframes, {
        duration: nodeSpeed,
        direction: "normal",
        iterations: 1,
      });

      node.style.visibility = "visible";
      text.innerText = "HTTP GET";
      text.style.bottom = '8px'
      text.style.top = ''

      animation.onfinish = () => {
        node.style.visibility = "hidden";
        const reverseInterval = setTimeout(() => {
          node.style.visibility = "visible";
          text.style.top = '8px'
          text.style.bottom = ''
          text.innerText = "200 HTML";
          const reverseAnimation = node.animate(keyframes, {
            duration: nodeSpeed,
            direction: "reverse",
            iterations: 1,
          });

          reverseAnimation.onfinish = () => {
            node.style.offsetPath = "none";
            node.style.visibility = "hidden";
            clearTimeout(reverseInterval);
          };
        }, 1000);
      };
    };

    const interval = setInterval(animateNode, 6000);
    animateNode();

    return () => {
      clearInterval(interval);
      node.style.visibility = "hidden";
      node.style.offsetPath = "none";
    };
  }, [selector, edgePath]);

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
    </>
  );
};

export const AnimatedEdgeNode = () => {
  return (
    <div
      style={{
        background: "gray",
        borderRadius: "50%",
        width: "10px",
        height: "10px",
      }}
    >
      <p
        id="1->2text"
        style={{ position: "absolute", fontSize: "10px" }}
      ></p>
    </div>
  );
};
