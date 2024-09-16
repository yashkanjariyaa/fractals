import React, { useRef, useEffect, useState } from "react";

const PythagorasTree = () => {
  const canvasRef = useRef(null);
  const [depth, setDepth] = useState(5); // Controls tree depth
  const [size, setSize] = useState(100); // Controls initial square size

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawSquare = (ctx, x, y, size, angle) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = "#228B22"; // Tree green color
      ctx.fillRect(0, 0, size, size);
      ctx.strokeStyle = "#FFFFFF"; // White border color
      ctx.lineWidth = 2; // Border thickness
      ctx.strokeRect(0, 0, size, size);
      ctx.restore();
    };

    const drawTree = (ctx, x, y, size, angle, depth) => {
      if (depth === 0) return;

      // Draw the current square (the base of the tree)
      drawSquare(ctx, x, y, size, angle);

      const newSize = size / Math.sqrt(2);
      const offset = size / 2;

      // Calculate the new positions and angles for the branches
      const xOffset = offset * Math.cos(angle);
      const yOffset = offset * Math.sin(angle);

      // Recursively draw the left and right branches
      drawTree(
        ctx,
        x + xOffset,
        y - offset,
        newSize,
        angle + Math.PI / 4,
        depth - 1
      );
      drawTree(
        ctx,
        x - xOffset,
        y - offset,
        newSize,
        angle - Math.PI / 4,
        depth - 1
      );
    };

    // Clear the canvas and set up the base square
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Center alignment
    const startX = canvas.width / 2 - size / 2;
    const startY = canvas.height - size;

    // Draw the Pythagoras tree
    drawTree(ctx, startX, startY, size, 0, depth);
  }, [depth, size]); // Re-render the tree when depth or size changes

  return (
    <div style={{ textAlign: "center" }}>
      {" "}
      {/* Center align the plot */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></canvas>
      <div style={{ marginTop: "20px" }}>
        <label>
          Depth: {depth}
          <input
            type="range"
            min="1"
            max="12"
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Initial Square Size: {size}
          <input
            type="range"
            min="20"
            max="150"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default PythagorasTree;
