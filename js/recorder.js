"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Recorder = /** @class */ (function () {
    function Recorder(worker) {
        var _this = this;
        this.worker = worker;
        this.worker.onmessage = function (event) {
            switch (event.data.command) {
                case 'end':
                    var blob = new Blob(event.data.buffer, { type: 'audio/mp3' });
                    if (_this.onsuccess) {
                        _this.onsuccess(blob);
                    }
                    break;
                default:
                    break;
            }
        };
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
            _this.context = new AudioContext();
            _this.microphone = _this.context.createMediaStreamSource(stream);
            _this.processor = _this.context.createScriptProcessor(4096, 1, 1);
            _this.processor.onaudioprocess = function (event) {
                var buffer = event.inputBuffer.getChannelData(0);
                _this.worker.postMessage({
                    command: 'encode',
                    buffer: buffer
                });
            };
        })
            .catch(function (reason) {
            console.log(reason);
        });
    }
    Recorder.prototype.start = function () {
        this.microphone.connect(this.processor);
        this.processor.connect(this.context.destination);
        console.log("started");
    };
    Recorder.prototype.stop = function () {
        this.microphone.disconnect();
        this.processor.disconnect();
        console.log("stopped");
    };
    Recorder.prototype.getBlob = function (success) {
        this.worker.postMessage({ command: 'finish' });
        this.onsuccess = success;
    };
    return Recorder;
}());
exports.Recorder = Recorder;
