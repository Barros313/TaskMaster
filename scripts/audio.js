let chunks = [];
let mediaRecorder;

const audioContainer = document.getElementById("audio-container");
const startButton = document.getElementById("record-button");
const stopButton = document.getElementById("stop-button");
const audioElement = document.getElementById("audio-control");
const recordingMessage = document.getElementById('recording-message');

startButton.addEventListener("click", () => {
    startButton.disabled = true;
    startButton.style.display = 'none';
    stopButton.disabled = false;
    stopButton.style.display = 'inline-flex';

    recordingMessage.style.display = "inline-flex";

    chunks = [];

    navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };
        })
        .catch((error) => {
            console.error('Error acessing microphone: ')
        }); 
});

stopButton.addEventListener("click", () => {
    startButton.disabled = false;
    startButton.style.display = 'inline-flex';
    stopButton.disabled = true;
    stopButton.style.display = 'none';

    recordingMessage.style.display = 'none';

    mediaRecorder.stop();
});