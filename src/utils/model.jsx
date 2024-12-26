import * as tf from "@tensorflow/tfjs";

let model;

export const loadModel = async () => {
  if (!model) {
    model = await tf.loadLayersModel("/mnist_model/model.json");
  }
};

export const preprocessCanvas = (canvas) => {
  const offScreenCanvas = document.createElement("canvas");
  offScreenCanvas.width = 28;
  offScreenCanvas.height = 28;

  const offScreenContext = offScreenCanvas.getContext("2d");
  offScreenContext.drawImage(canvas, 0, 0, 28, 28);

  const imageData = offScreenContext.getImageData(0, 0, 28, 28);

  const data = new Float32Array(28 * 28);
  for (let i = 0; i < data.length; i++) {
    data[i] = imageData.data[i * 4] / 255;
  }

  return tf.tensor4d(data, [1, 28, 28, 1]);
};

export const predictDigit = async (processedData) => {
  if (!model) await loadModel();

  const predictions = model.predict(processedData);
  const confidence = predictions.max().dataSync()[0];
  const prediction = predictions.argMax(1).dataSync()[0];

  return { prediction, confidence };
};
