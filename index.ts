import {Recorder} from './recorder.js';

//let worker = new Worker('js/mp3worker.js');
let worker = new Worker('workers/xfworker.js');

let recorder = new Recorder(worker);

window.onload = function(event) {
    let start = document.querySelector('#start') as HTMLButtonElement;
    let stop = document.querySelector('#stop') as HTMLButtonElement;

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
