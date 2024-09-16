import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Line, Text } from "react-konva";

const Mandelbrot = () => {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(600);
  const [image, setImage] = useState(null);
  const [imageObj, setImageObj] = useState(null);
  const [xmin, setXmin] = useState(-2.0);
  const [xmax, setXmax] = useState(1.0);
  const [ymin, setYmin] = useState(-1.5);
  const [ymax, setYmax] = useState(1.5);
  const [rangeScale, setRangeScale] = useState(1); // New slider state
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const maxIter = 256;
  const canvasRef = useRef(null);

  // Helper to interpolate colors
  const interpolateColor = (iterations, maxIter) => {
    const ratio = iterations / maxIter;
    const red = Math.floor(255 * ratio);
    const green = Math.floor(255 * (1 - ratio));
    return `rgb(${red},${green},255)`; // Blue to red gradient
  };

  const mandelbrot = (c, maxIter) => {
    let z = { real: c.real, imag: c.imag };
    for (let i = 0; i < maxIter; i++) {
      const real2 = z.real * z.real - z.imag * z.imag;
      const imag2 = 2 * z.real * z.imag;
      z.real = real2 + c.real;
      z.imag = imag2 + c.imag;
      if (z.real * z.real + z.imag * z.imag > 4) {
        return i;
      }
    }
    return maxIter;
  };

  const drawMandelbrot = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const c_real = xmin + (x / width) * (xmax - xmin);
        const c_imag = ymin + (y / height) * (ymax - ymin);
        const m = mandelbrot({ real: c_real, imag: c_imag }, maxIter);

        const color =
          m === maxIter ? "rgb(0,0,0)" : interpolateColor(m, maxIter);
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
    const dataURL = canvas.toDataURL();
    setImage(dataURL);
  };

  // Update ranges based on slider
  const handleSliderChange = (value) => {
    const scaleFactor = 1 / value; // Calculate scale factor based on slider value
    const xRange = (xmax - xmin) * scaleFactor;
    const yRange = (ymax - ymin) * scaleFactor;

    setXmin(-2.0 * scaleFactor);
    setXmax(1.0 * scaleFactor);
    setYmin(-1.5 * scaleFactor);
    setYmax(1.5 * scaleFactor);
    setRangeScale(value); // Update the slider value
  };

  useEffect(() => {
    drawMandelbrot();
  }, [xmin, xmax, ymin, ymax, pan]);

  useEffect(() => {
    if (image) {
      const img = new window.Image(); // Use the global Image object
      img.src = image;
      img.onload = () => {
        setImageObj(img);
      };
    }
  }, [image]);

  const handleDragEnd = (e) => {
    const dragDistanceX = e.target.x() - 300; // Drag distance in X direction
    const dragDistanceY = e.target.y() - 300; // Drag distance in Y direction

    // Calculate how much to move in terms of the plot's coordinate range
    const xMove = (xmax - xmin) * (dragDistanceX / width);
    const yMove = (ymax - ymin) * (dragDistanceY / height);

    // Update the plot's boundaries based on the drag movement
    setXmin(xmin - xMove);
    setXmax(xmax - xMove);
    setYmin(ymin - yMove);
    setYmax(ymax - yMove);

    // Reset the pan position to avoid cumulative dragging
    e.target.position({ x: 300, y: 300 });
  };

  const renderAxisLabels = () => {
    return (
      <>
        {/* X-axis */}
        <Text
          x={pan.x + 300}
          y={300 - pan.y}
          text={`${xmin.toFixed(2)} to ${xmax.toFixed(2)}`}
          fontSize={16}
          fill="white"
        />
        {/* Y-axis */}
        <Text
          x={300 - pan.x}
          y={pan.y + 300}
          text={`${ymin.toFixed(2)} to ${ymax.toFixed(2)}`}
          fontSize={16}
          fill="white"
          rotation={90}
        />
      </>
    );
  };

  return (
    <>
      {/* Slider to control range */}
      <div style={{ marginBottom: "10px" }}>
        <label>Zoom Level:</label>
        <input
          type="range"
          min="1"
          max="5"
          step="0.1"
          value={rangeScale}
          onChange={(e) => handleSliderChange(e.target.value)}
        />
      </div>
      <Stage
        width={600}
        height={600}
        offsetX={300} // Center the stage
        offsetY={300} // Center the stage
        x={pan.x + 300} // Adjust for centering
        y={pan.y + 300} // Adjust for centering
        ref={canvasRef}
        onDragEnd={handleDragEnd}
        draggable
      >
        <Layer>
          {/* Mandelbrot Set */}
          {imageObj && <KonvaImage image={imageObj} width={600} height={600} />}
          {/* X and Y axes */}
          <Line
            points={[0, 300, 600, 300]} // Horizontal axis
            stroke="white"
            strokeWidth={1}
            style={{ position: "absolute" }}
          />
          <Line
            points={[300, 0, 300, 600]} // Vertical axis
            stroke="white"
            strokeWidth={1}
            style={{ position: "absolute" }}
          />
          {/* Axis Labels */}
          {renderAxisLabels()}
        </Layer>
      </Stage>
    </>
  );
};

export default Mandelbrot;
