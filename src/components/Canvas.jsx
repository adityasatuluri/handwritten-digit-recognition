import React, { useRef, useEffect, useCallback } from "react";
import { preprocessCanvas, predictDigit } from "../utils/model";

const Canvas = ({ setPrediction, setConfidence }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const handleMouseDown = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const draw = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      context.fillStyle = "white";
      context.beginPath();
      context.arc(x, y, 8, 0, Math.PI * 2);
      context.fill();

      triggerPrediction();
    };

    canvas.addEventListener("mousemove", draw);

    const stopDrawing = () => {
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
    };

    canvas.addEventListener("mouseup", stopDrawing);
  };

  const triggerPrediction = useCallback(async () => {
    const canvas = canvasRef.current;
    const processedData = preprocessCanvas(canvas);
    const { prediction, confidence } = await predictDigit(processedData);
    setPrediction(prediction);
    setConfidence(confidence);
  }, [setPrediction, setConfidence]);

  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    setPrediction(null);
    setConfidence(null);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <canvas
        ref={canvasRef}
        width="300"
        height="300"
        onMouseDown={handleMouseDown}
      />
      <div>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default Canvas;
