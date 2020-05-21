# Object and People Detection in Browser
Object and People detection with TensorFlow.js in browser.
## Prerequisites
Install Node.js https://nodejs.org/it/
## Usage
In terminal change directory to this one. Then:
```
npm install
npm start
```
Go to: http://localhost:3000/. \
After some seconds you will see the video and besides it what and how many things it has detected (if any).
## Description
This project contains a simple http server implemented using express and the resource index.html.\
index.html contains just a video and a text view and the script for ObjectDetection.\
The model is the one pretrained by the TensorFlow community: https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd.
