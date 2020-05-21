const video = document.getElementById('video');
const objectDetectedTxt = document.getElementById('objectDetected');
let model;

const constraints = {
    video: { facingMode: "user" }
};

Promise.all([
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            video.srcObject = stream;
        }).catch(error => console.error(error)),
    cocoSsd.load().then(modelP => {
        model = modelP;
        console.log("model loaded");
    })
]).then(startDetection);

function startDetection() {
    const canvas = document.createElement('canvas');
    // document.body.append(canvas);
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    setInterval(async () => {
        model.detect(video).then(predictions => {
            // console.log('Predictions: ', predictions);
            let predMap = {};
            for (pred of predictions) {
                if (predMap[pred.class] == undefined) predMap[pred.class] = 1;
                else predMap[pred.class] += 1;
            }
            let txt = "";
            for (pred in predMap) {
                txt += pred + ": " + predMap[pred] + '\n';
            }
            objectDetectedTxt.textContent = txt
        });
    }, 1000)
}