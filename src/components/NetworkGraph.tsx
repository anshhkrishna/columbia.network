"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Member, Connection } from "@/data/members";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  forceX,
  forceY,
  Simulation,
  SimulationNodeDatum,
  SimulationLinkDatum,
} from "d3-force";

interface NetworkGraphProps {
  members: Member[];
  connections: Connection[];
  highlightedMemberIds?: string[];
  searchQuery?: string;
  selectedMemberId?: string | null;
  onNodeClick?: (memberId: string, firstName: string) => void;
}

interface SimNode extends SimulationNodeDatum {
  id: string;
  name: string | null;
  profilePic: string | undefined;
  website: string | null | undefined;
}

interface SimLink extends SimulationLinkDatum<SimNode> {
  source: string | SimNode;
  target: string | SimNode;
}

type NodeDiv = HTMLDivElement & {
  __isDragging?: boolean;
};

export default function NetworkGraph({
  members,
  connections,
  highlightedMemberIds = [],
  searchQuery = "",
  selectedMemberId = null,
  onNodeClick,
}: NetworkGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const nodesRef = useRef<SimNode[]>([]);
  const nodeElementsRef = useRef<Map<string, NodeDiv>>(new Map());
  const simulationRef = useRef<Simulation<SimNode, SimLink> | null>(null);
  const dragNodeRef = useRef<string | null>(null);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const isPanningRef = useRef(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(false);
  const zoomLevelRef = useRef(1);
  const panOffsetRef = useRef({ x: 0, y: 0 });
  const dimensionsRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const checkDarkMode = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDark(theme === "dark");
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const updateVisuals = useCallback(() => {
    const svg = svgRef.current;
    const nodes = nodesRef.current;
    const container = containerRef.current;

    if (!svg || !container) return;

    const { width, height } = dimensionsRef.current;
    const zoomLevel = zoomLevelRef.current;
    const panOffset = panOffsetRef.current;

    svg.innerHTML = "";
    connections.forEach((conn) => {
      const fromNode = nodes.find((n) => n.id === conn.fromId);
      const toNode = nodes.find((n) => n.id === conn.toId);
      const isSelectedLink =
        selectedMemberId &&
        (conn.fromId === selectedMemberId || conn.toId === selectedMemberId);

      if (
        fromNode &&
        toNode &&
        fromNode.x != null &&
        fromNode.y != null &&
        toNode.x != null &&
        toNode.y != null
      ) {
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        const x1 =
          (fromNode.x - width / 2) * zoomLevel + width / 2 + panOffset.x;
        const y1 =
          (fromNode.y - height / 2) * zoomLevel + height / 2 + panOffset.y;
        const x2 = (toNode.x - width / 2) * zoomLevel + width / 2 + panOffset.x;
        const y2 =
          (toNode.y - height / 2) * zoomLevel + height / 2 + panOffset.y;

        line.setAttribute("x1", x1.toString());
        line.setAttribute("y1", y1.toString());
        line.setAttribute("x2", x2.toString());
        line.setAttribute("y2", y2.toString());
        const accent = "#6cb4e4";
        const highlight = "#ffffff";
        line.setAttribute("stroke", isSelectedLink ? highlight : accent);
        line.setAttribute("stroke-width", isSelectedLink ? "3" : "2");
        line.setAttribute("opacity", isSelectedLink ? "1" : "0.35");
        svg.appendChild(line);
      }
    });

    nodes.forEach((node) => {
      const nodeDiv = nodeElementsRef.current.get(node.id);
      if (nodeDiv && node.x != null && node.y != null) {
        const transformedX =
          (node.x - width / 2) * zoomLevel + width / 2 + panOffset.x;
        const transformedY =
          (node.y - height / 2) * zoomLevel + height / 2 + panOffset.y;

        nodeDiv.style.left = `${transformedX}px`;
        nodeDiv.style.top = `${transformedY}px`;
        nodeDiv.style.transform = `translate(-50%, -50%) scale(${zoomLevel})`;

        const avatarChild = nodeDiv.firstElementChild as HTMLElement;
        if (avatarChild) {
          const isHighlighted =
            highlightedMemberIds.length === 0 ||
            highlightedMemberIds.includes(node.id);
          const isSelected = selectedMemberId === node.id;
          const isNeighbor =
            !!selectedMemberId &&
            connections.some(
              (c) =>
                (c.fromId === selectedMemberId && c.toId === node.id) ||
                (c.toId === selectedMemberId && c.fromId === node.id)
            );

          if (searchQuery && isHighlighted) {
            avatarChild.style.opacity = "1";
          } else if (searchQuery && !isHighlighted) {
            avatarChild.style.opacity = "0.3";
          } else {
            avatarChild.style.opacity = "1";
          }

          if (isSelected || isNeighbor) {
            avatarChild.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.8)";
            avatarChild.style.border = "2px solid #ffffff";
            avatarChild.style.filter = "none";
          } else {
            avatarChild.style.boxShadow = "none";
            avatarChild.style.border = "none";
          }
        }
      }
    });
  }, [connections, highlightedMemberIds, searchQuery, selectedMemberId]);

  useEffect(() => {
    if (!containerRef.current) return;

    const { width, height } = dimensionsRef.current;

    if (searchQuery && highlightedMemberIds.length > 0) {
      const targetNode = nodesRef.current.find((n) =>
        highlightedMemberIds.includes(n.id)
      );

      if (targetNode && targetNode.x != null && targetNode.y != null) {
        const newZoom = 2.5;
        zoomLevelRef.current = newZoom;

        const targetZoomedX = (targetNode.x - width / 2) * newZoom + width / 2;
        const targetZoomedY =
          (targetNode.y - height / 2) * newZoom + height / 2;

        const offsetX = width / 2 - targetZoomedX;
        const offsetY = height / 2 - targetZoomedY;

        panOffsetRef.current = { x: offsetX, y: offsetY };
        updateVisuals();
      }
    } else if (!searchQuery) {
      zoomLevelRef.current = 1;
      panOffsetRef.current = { x: 0, y: 0 };
      updateVisuals();
    }
  }, [searchQuery, highlightedMemberIds, updateVisuals]);

  useEffect(() => {
    if (!containerRef.current || members.length === 0) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    dimensionsRef.current = { width, height };

    container.innerHTML = "";
    nodeElementsRef.current.clear();

    // Stop any existing simulation
    if (simulationRef.current) {
      simulationRef.current.stop();
    }

    // Golden spiral for initial positions
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    nodesRef.current = members.map((member, i) => {
      const radius =
        Math.sqrt(i + 0.5) *
        (Math.min(width, height) / (2.5 * Math.sqrt(members.length)));
      const angle = i * goldenAngle;

      return {
        id: member.id,
        name: member.name,
        profilePic: member.profilePic,
        website: member.website,
        x: width / 2 + radius * Math.cos(angle),
        y: height / 2 + radius * Math.sin(angle),
      };
    });

    // Build links array for d3-force
    const links: SimLink[] = connections.map((conn) => ({
      source: conn.fromId,
      target: conn.toId,
    }));

    // === Physics config — tweak everything here ===
    const physics = {
      chargeStrength: -400, // repulsion between nodes; more negative = spread further apart
      linkDistance: 120, // target edge length in px; higher = connected nodes sit further apart
      collideRadius: 30, // min distance between node centers; prevents overlap
      centerStrengthX: 0.02, // horizontal pull toward center; higher = snaps back faster
      centerStrengthY: 0.02, // vertical pull toward center; higher = snaps back faster
      velocityDecay: 0.25, // friction; lower = more momentum/overshoot/bounce
      alpha: 0.3, // constant energy level; higher = more movement
      dragAlpha: 0.4, // energy level while dragging; higher = neighbors react more
    };

    const simulation = forceSimulation<SimNode>(nodesRef.current)
      .force(
        "charge",
        forceManyBody<SimNode>().strength(physics.chargeStrength)
      )
      .force(
        "link",
        forceLink<SimNode, SimLink>(links)
          .id((d) => d.id)
          .distance(physics.linkDistance)
      )
      .force("center", forceCenter<SimNode>(width / 2, height / 2))
      .force("collide", forceCollide<SimNode>(physics.collideRadius))
      .force("x", forceX<SimNode>(width / 2).strength(physics.centerStrengthX))
      .force("y", forceY<SimNode>(height / 2).strength(physics.centerStrengthY))
      .velocityDecay(physics.velocityDecay)
      .alpha(physics.alpha)
      .alphaDecay(0)
      .on("tick", () => {
        updateVisuals();
      });

    simulationRef.current = simulation;

    // Create SVG for edges
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.pointerEvents = "none";
    svgRef.current = svg;
    container.appendChild(svg);

    // Create DOM nodes
    nodesRef.current.forEach((node) => {
      const nodeDiv = document.createElement("div") as NodeDiv;
      nodeDiv.style.position = "absolute";
      nodeDiv.style.cursor = "grab";
      nodeDiv.style.userSelect = "none";
      // No CSS transitions — simulation drives positioning

      let avatarEl: HTMLElement;

      if (node.profilePic) {
        const img = document.createElement("img");
        img.src = node.profilePic;
        img.style.width = "40px";
        img.style.height = "40px";
        img.style.borderRadius = "50%";
        img.style.objectFit = "cover";
        img.style.filter = "none";
        img.style.display = "block";
        img.draggable = false;
        img.style.transition = "filter 0.3s ease, opacity 0.3s ease";
        avatarEl = img;
      } else {
        const initialsDiv = document.createElement("div");
        const initials = (node.name || "?")
          .split(" ")
          .map((w) => w[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);
        initialsDiv.textContent = initials;
        initialsDiv.style.width = "40px";
        initialsDiv.style.height = "40px";
        initialsDiv.style.borderRadius = "50%";
        initialsDiv.style.display = "flex";
        initialsDiv.style.alignItems = "center";
        initialsDiv.style.justifyContent = "center";
        initialsDiv.style.backgroundColor = isDark ? "#888" : "#555";
        initialsDiv.style.color = isDark ? "#fff" : "#fff";
        initialsDiv.style.fontSize = "16px";
        initialsDiv.style.fontWeight = "600";
        initialsDiv.style.fontFamily = "'Times New Roman', Times, serif";
        initialsDiv.style.transition = "opacity 0.3s ease";
        avatarEl = initialsDiv;
      }

      const nameLabel = document.createElement("div");
      nameLabel.textContent = node.name || "Unknown";
      nameLabel.style.position = "absolute";
      nameLabel.style.top = "100%";
      nameLabel.style.left = "50%";
      nameLabel.style.transform = "translateX(-50%)";
      nameLabel.style.marginTop = "4px";
      nameLabel.style.padding = "2px 6px";
      nameLabel.style.background = isDark
        ? "rgba(0, 0, 0, 0.8)"
        : "rgba(255, 255, 255, 0.9)";
      nameLabel.style.color = isDark ? "#fff" : "#000";
      nameLabel.style.fontSize = "11px";
      nameLabel.style.fontWeight = "500";
      nameLabel.style.borderRadius = "4px";
      nameLabel.style.whiteSpace = "nowrap";
      nameLabel.style.pointerEvents = "none";
      nameLabel.style.opacity = "0";
      nameLabel.style.transition = "opacity 0.2s ease";
      nameLabel.style.zIndex = "1000";
      nameLabel.style.fontFamily = "Inter, sans-serif";

      nodeDiv.addEventListener("mouseenter", () => {
        if (avatarEl instanceof HTMLImageElement) avatarEl.style.filter = "grayscale(0%)";
        avatarEl.style.opacity = "1";
        avatarEl.style.transform = "scale(1.15)";
        nameLabel.style.opacity = "1";
        nameLabel.style.background = "rgba(12,16,24,0.85)";
        nameLabel.style.border = "1px solid #6cb4e4";
        nameLabel.style.color = "#6cb4e4";
      });

      nodeDiv.addEventListener("mouseleave", () => {
        const isHighlighted =
          highlightedMemberIds.length === 0 ||
          highlightedMemberIds.includes(node.id);
        if (searchQuery && isHighlighted) {
          avatarEl.style.opacity = "1";
        } else if (searchQuery && !isHighlighted) {
          avatarEl.style.opacity = "0.3";
        } else {
          avatarEl.style.opacity = "1";
        }
        avatarEl.style.transform = "scale(1)";
        nameLabel.style.opacity = "0";
        nameLabel.style.background = isDark
          ? "rgba(0, 0, 0, 0.8)"
          : "rgba(255, 255, 255, 0.9)";
        nameLabel.style.border = "none";
        nameLabel.style.color = isDark ? "#fff" : "#000";
      });

      nodeDiv.addEventListener("mousedown", (e) => {
        nodeDiv.__isDragging = false;
        dragStartRef.current = { x: e.clientX, y: e.clientY };
        isDraggingRef.current = false;
        dragNodeRef.current = node.id;
        nodeDiv.style.cursor = "grabbing";

        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const zoomLevel = zoomLevelRef.current;
        const panOffset = panOffsetRef.current;
        const transformedX =
          (node.x! - width / 2) * zoomLevel + width / 2 + panOffset.x;
        const transformedY =
          (node.y! - height / 2) * zoomLevel + height / 2 + panOffset.y;

        dragOffsetRef.current = {
          x: mouseX - transformedX,
          y: mouseY - transformedY,
        };

        // Pin the node and reheat simulation
        node.fx = node.x;
        node.fy = node.y;
        simulation.alpha(physics.dragAlpha).restart();
      });

      nodeDiv.addEventListener("click", () => {
        const wasDragging = nodeDiv.__isDragging === true;
        if (!wasDragging && !isDraggingRef.current) {
          if (onNodeClick && node.name) {
            const firstName = node.name.split(" ")[0].toLowerCase();
            onNodeClick(node.id, firstName);
          }
          if (node.website) {
            const url = node.website.startsWith("http")
              ? node.website
              : `https://${node.website}`;
            window.open(url, "_blank");
          }
        }
        nodeDiv.__isDragging = false;
      });

      nodeDiv.appendChild(avatarEl);
      nodeDiv.appendChild(nameLabel);
      container.appendChild(nodeDiv);
      nodeElementsRef.current.set(node.id, nodeDiv);
    });

    const handleContainerMouseDown = (e: MouseEvent) => {
      if (e.target === container || e.target === svgRef.current) {
        isPanningRef.current = true;
        container.style.cursor = "grabbing";
        panStartRef.current = {
          x: e.clientX - panOffsetRef.current.x,
          y: e.clientY - panOffsetRef.current.y,
        };
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (dragNodeRef.current && dragStartRef.current) {
        const moveDistance =
          Math.abs(e.clientX - dragStartRef.current.x) +
          Math.abs(e.clientY - dragStartRef.current.y);
        if (moveDistance > 3) {
          isDraggingRef.current = true;
          const nodeDiv = nodeElementsRef.current.get(dragNodeRef.current);
          if (nodeDiv) {
            nodeDiv.__isDragging = true;
          }
        }

        const rect = container.getBoundingClientRect();
        const node = nodesRef.current.find((n) => n.id === dragNodeRef.current);
        if (node) {
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          const zoomLevel = zoomLevelRef.current;
          const panOffset = panOffsetRef.current;

          const newX =
            (mouseX - dragOffsetRef.current.x - panOffset.x - width / 2) /
              zoomLevel +
            width / 2;
          const newY =
            (mouseY - dragOffsetRef.current.y - panOffset.y - height / 2) /
              zoomLevel +
            height / 2;

          // Pin node to dragged position
          node.fx = newX;
          node.fy = newY;

          updateVisuals();
        }
      } else if (isPanningRef.current) {
        const newPanX = e.clientX - panStartRef.current.x;
        const newPanY = e.clientY - panStartRef.current.y;
        panOffsetRef.current = { x: newPanX, y: newPanY };
        updateVisuals();
      }
    };

    const handleMouseUp = () => {
      if (dragNodeRef.current) {
        const node = nodesRef.current.find((n) => n.id === dragNodeRef.current);
        if (node) {
          // Unpin node so it settles back into simulation
          node.fx = null;
          node.fy = null;
        }
        const nodeDiv = nodeElementsRef.current.get(dragNodeRef.current);
        if (nodeDiv) {
          nodeDiv.style.cursor = "grab";
        }
        // Cool down the simulation
        simulation.alpha(physics.alpha);
        isDraggingRef.current = false;
        dragNodeRef.current = null;
      }

      if (isPanningRef.current) {
        isPanningRef.current = false;
        container.style.cursor = "";
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const zoomLevel = zoomLevelRef.current;
      const panOffset = panOffsetRef.current;

      const zoomDelta = e.deltaY > 0 ? 0.97 : 1.03;
      const newZoom = Math.min(Math.max(zoomLevel * zoomDelta, 0.5), 5);

      const zoomPointX =
        (mouseX - panOffset.x - width / 2) / zoomLevel + width / 2;
      const zoomPointY =
        (mouseY - panOffset.y - height / 2) / zoomLevel + height / 2;

      const newPanX = mouseX - (zoomPointX - width / 2) * newZoom - width / 2;
      const newPanY = mouseY - (zoomPointY - height / 2) * newZoom - height / 2;

      zoomLevelRef.current = newZoom;
      panOffsetRef.current = { x: newPanX, y: newPanY };

      updateVisuals();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("mousedown", handleContainerMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    updateVisuals();

    return () => {
      simulation.stop();
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("mousedown", handleContainerMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [members, connections, isDark, updateVisuals, highlightedMemberIds, searchQuery, onNodeClick]);

  return (
    <div
      ref={containerRef}
      className="network-graph-container"
      style={{
        width: "100%",
        height: "400px",
      }}
    />
  );
}
