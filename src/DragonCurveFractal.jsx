import React, { useRef, useEffect, useState } from "react";

const DragonCurve = () => {
  const canvasRef = useRef(null);
  const [depth, setDepth] = useState(10);
  const [size, setSize] = useState(400);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawDragonCurve = (ctx, x0, y0, x1, y1, depth, direction) => {
      if (depth === 0) {
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      } else {
        const midX = (x0 + x1) / 2 + ((y0 - y1) / 2) * direction;
        const midY = (y0 + y1) / 2 + ((x1 - x0) / 2) * direction;

        drawDragonCurve(ctx, x0, y0, midX, midY, depth - 1, 1);
        drawDragonCurve(ctx, midX, midY, x1, y1, depth - 1, -1);
      }
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;

    // Initial points
    const startX = (canvas.width - size) / 2;
    const startY = canvas.height / 2;
    const endX = startX + size;
    const endY = startY;

    drawDragonCurve(ctx, startX, startY, endX, endY, depth, 1);
  }, [depth, size]);

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: "3rem",
          textAlign: "center",
        }}
      >
       Dragon Curve
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{
          background:"#FF4500",
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
            max="20"
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
            max="600"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default DragonCurve;
