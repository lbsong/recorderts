import {Recorder} from './js/recorder.js';

let worker = new Worker('./worker.js');

let recorder = new recorder();

document.onload(event => {
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
        })
    });
});
