import { Recorder } from './recorder';
let worker = new Worker('./worker.js');
let recorder = new Recorder(worker);
window.onload = function (event) {
    let start = document.querySelector('#start');
    let stop = document.querySelector('#stop');
    start.addEventListener('click', function () {
        recorder.start();
    });
    stop.addEventListener('click', function () {
        recorder.stop();
        recorder.getBlob(function (blob) {
            let audio = document.querySelector('audio');
            audio.src = URL.createObjectURL(blob);
        });
    });
};
