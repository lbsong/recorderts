"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var recorder_1 = require("./recorder");
var worker = new Worker('./worker.js');
var recorder = new recorder_1.Recorder(worker);
window.onload = function (event) {
    var start = document.querySelector('#start');
    var stop = document.querySelector('#stop');
    start.addEventListener('click', function () {
        recorder.start();
    });
    stop.addEventListener('click', function () {
        recorder.stop();
        recorder.getBlob(function (blob) {
            var audio = document.querySelector('audio');
            audio.src = URL.createObjectURL(blob);
        });
    });
};
