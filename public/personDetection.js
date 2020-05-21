const video = document.getElementById('video');
const objectDetectedTxt = document.getElementById('objectDetected');
let model;

//let isModelLoaded = false;

const constraints = {
    // audio: true,
    video: { facingMode: "user" }
};

Promise.all([
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            video.srcObject = stream;
        }).catch(error => console.error(error)),
    cocoSsd.load().then(modelP => {
        model = modelP;
        //isModelLoaded = true;
        console.log("model loaded");
    })
]).then(startDetection);

function startDetection() {
    const canvas = document.createElement('canvas');
    // document.body.append(canvas);
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    setInterval(async () => {
        //if (isModelLoaded) {
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
            //if (nPeople != 0) console.log("found people: ", nPeople);
            objectDetectedTxt.textContent = txt
        });
        //}
    }, 1000)
}