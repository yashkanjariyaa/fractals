import React, { useRef, useEffect, useState } from "react";

const CCurveFractal = () => {
  const canvasRef = useRef(null);
  const [depth, setDepth] = useState(5); // Controls depth of the C Curve
  const [size, setSize] = useState(200); // Controls the initial line length

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawCCurve = (ctx, x0, y0, x1, y1, depth) => {
      if (depth === 0) {
        // Draw the line connecting the two points
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      } else {
        // Calculate the mid-point and apply rotation for the next recursive step
        const midX = (x0 + x1) / 2 + (y0 - y1) / 2;
        const midY = (y0 + y1) / 2 + (x1 - x0) / 2;

        // Recursively draw both halves
        drawCCurve(ctx, x0, y0, midX, midY, depth - 1);
        drawCCurve(ctx, midX, midY, x1, y1, depth - 1);
      }
    };

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up the stroke style (you can change the color/width here)
    ctx.strokeStyle = "#0000FF"; // Blue color
    ctx.lineWidth = 2; // Line thickness

    // Start position (center the curve)
    const startX = (canvas.width - size) / 2;
    const startY = canvas.height / 2;
    const endX = startX + size;
    const endY = startY;

    // Draw the C curve
    drawCCurve(ctx, startX, startY, endX, endY, depth);
  }, [depth, size]); // Redraw when depth or size changes

  return (
    <div style={{ textAlign: "center" }}>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{
          border: "1px solid black",
          display: "block",
          margin: "0 auto",
        }}
      ></canvas>
      <div style={{ marginTop: "20px" }}>
        <label>
          Depth: {depth}
          <input
            type="range"
            min="1"
            max="15"
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Line Size: {size}
          <input
            type="range"
            min="50"
            max="400"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default CCurveFractal;
