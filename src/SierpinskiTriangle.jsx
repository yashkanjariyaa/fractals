import React, { useRef, useEffect, useState } from "react";

const SierpinskiTriangle = () => {
  const canvasRef = useRef(null);
  const [depth, setDepth] = useState(5); 
  const [size, setSize] = useState(400); 

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Function to draw a filled triangle
    const drawTriangle = (ctx, x0, y0, x1, y1, x2, y2) => {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.closePath();
      ctx.fill();
    };

    const drawSierpinski = (ctx, x0, y0, x1, y1, x2, y2, depth) => {
      if (depth === 0) {
        drawTriangle(ctx, x0, y0, x1, y1, x2, y2);
      } else {
        const midX01 = (x0 + x1) / 2;
        const midY01 = (y0 + y1) / 2;
        const midX12 = (x1 + x2) / 2;
        const midY12 = (y1 + y2) / 2;
        const midX20 = (x2 + x0) / 2;
        const midY20 = (y2 + y0) / 2;

        drawSierpinski(ctx, x0, y0, midX01, midY01, midX20, midY20, depth - 1);
        drawSierpinski(ctx, midX01, midY01, x1, y1, midX12, midY12, depth - 1);
        drawSierpinski(ctx, midX20, midY20, midX12, midY12, x2, y2, depth - 1);
      }
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0077FF";

    const height = (size * Math.sqrt(3)) / 2;
    const startX = (canvas.width - size) / 2;
    const startY = (canvas.height + height) / 2;

    drawSierpinski(
      ctx,
      startX,
      startY,
      startX + size,
      startY,
      startX + size / 2,
      startY - height,
      depth
    );
  }, [depth, size]); 

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: "3rem",
          textAlign: "center",
        }}
      >
        Sierpinski Triangle
      </div>
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
            max="10"
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Size: {size}
          <input
            type="range"
            min="100"
            max="600"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default SierpinskiTriangle;
