import React from "react";

const PredictionPanel = ({ prediction, confidence }) => {
  return (
    <div>
      <h2>Prediction</h2>
      <p>
        {prediction !== null
          ? `Digit: ${prediction} (Confidence: ${(confidence * 100).toFixed(
              2
            )}%)`
          : "Draw a digit and click predict"}
      </p>
    </div>
  );
};

export default PredictionPanel;
