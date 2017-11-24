import { Recorder } from './recorder.js';
let worker = new Worker('js/myworker.js');
let recorder = new Recorder(worker);
window.onload = function (event) {
    let start = document.querySelector('#start');
    let stop = document.querySelector('#stop');
    start.addEventListener('click', function () {
        recorder.start();
        this.disabled = true;
        stop.disabled = false;
    });
    stop.addEventListener('click', function () {
        recorder.stop();
        this.disabled = true;
        start.disabled = false;
        recorder.getBlob(function (blob) {
            let audio = document.querySelector('audio');
            audio.src = URL.createObjectURL(blob);
        });
    });
};
