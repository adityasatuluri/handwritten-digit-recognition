import React from "react";

const PredictionPanel = ({ prediction, confidence }) => {
  return (
    <div>
      <div className="prediction-results">
        {prediction !== null ? (
          <p>
            Digit: <strong>{prediction}</strong>
            <br />
            Confidence: <strong>{(confidence * 100).toFixed(2)}%</strong>
          </p>
        ) : (
          <p>Draw a digit to see the prediction</p>
        )}
      </div>
    </div>
  );
};

export default PredictionPanel;
