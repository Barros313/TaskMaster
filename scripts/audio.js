const audioContainer = document.getElementById('audio-container');
const recordButton = document.getElementById('record-button');
const stopButton = document.getElementById('stop-button');
const removeButton = document.getElementById('remove-button');

let streamer;
let recorder;
let recordedChunks = [];

let stopAudio = () => {
    if (recorder && streamer) {
        recorder.stop();
        streamer.getTracks().forEach(track => track.stop());

        document.getElementById('recording-message')
            .style.display = 'none';
    }
};

let playAudio = () => {
    if (recordedChunks.length === 0) {
        alert('Nenhum áudio gravado.');
        return;
    }

    let blob = new Blob(recordedChunks, { type: 'audio/webm' });
    let audioURL = URL.createObjectURL(blob);
    let audio = new Audio(audioURL);
    
    audio.controls = true;
    audioContainer.appendChild(audio);
    audio.play();
};

let removeAudio = () => {
    if (recordedChunks.length === 0) {
        alert('Nenhum áudio para excluir');
        return;
    }

    recordedChunks = [];

    let audioElement = document.querySelector('audio');
    if (audioElement) {
        audioElement.parentNode.removeChild(audioElement);
    }
};

let recordAudio = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('API não suportada nesse navegador.');
        return;
    }

    let constraints = { audio: true };

    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            streamer = stream;

            try {
                recorder = new MediaRecorder(stream, { mimetype: "audio/webm" });
            } catch (exc) {
                console.error("Exception while creating MediaRecorder: " + exc);
                return;
            }

            console.log("MediaRecorder created successfully");
            recorder.ondataavailable = recorderOnDataAvailable;
            recorder.start(100);

            let recordingMessage = document.getElementById('recording-message');
            recordingMessage.style.display = "inline";

            recorder.onstop = () => {
                playAudio();
                recordingMessage.style.display = 'none';
            };
        })
        .catch((error) => {
           console.error('Error accessing the microphone: ' + error); 
        });
}

let recorderOnDataAvailable = (event) => {
    if(event.data.size == 0) {
        return
    };

    recordedChunks.push(event.data);
};