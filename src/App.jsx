import React, { useState } from "react";
import Canvas from "./components/Canvas";
import PredictionPanel from "./components/PredictionPanel";
import "./App.css";

function App() {
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);

  return (
    <div className="App">
      <h1>Live Handwritten Digit Recognition</h1>
      <Canvas setPrediction={setPrediction} setConfidence={setConfidence} />
      <PredictionPanel prediction={prediction} confidence={confidence} />
    </div>
  );
}

export default App;
