import React, { useState } from "react";
import Canvas from "./components/Canvas";
import PredictionPanel from "./components/PredictionPanel";
import "./App.css";

function App() {
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);

  return (
    <div className="app-container">
      <div className="canvas-container">
        <Canvas setPrediction={setPrediction} setConfidence={setConfidence} />
      </div>

      <div className="prediction-container">
        <h1>Prediction Details</h1>
        <PredictionPanel prediction={prediction} confidence={confidence} />
      </div>
    </div>
  );
}

export default App;
