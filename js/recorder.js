class Recorder {
    constructor(worker) {
        let _this = this;
        this.worker = worker;
        this.worker.onmessage = function (event) {
            switch (event.data.command) {
                case 'end':
                    let blob = new Blob(event.data.buffer, { type: 'audio/mp3' });
                    if (_this.onsuccess) {
                        _this.onsuccess(blob);
                    }
                    break;
                default:
                    break;
            }
        };
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
            _this.context = new AudioContext();
            _this.microphone = _this.context.createMediaStreamSource(stream);
            _this.processor = _this.context.createScriptProcessor(4096, 1, 1);
            _this.processor.onaudioprocess = function (event) {
                let buffer = event.inputBuffer.getChannelData(0);
                _this.worker.postMessage({
                    command: 'encode',
                    buffer: buffer
                });
            };
        })
            .catch(reason => {
            console.log(reason);
        });
    }
    start() {
        this.microphone.connect(this.processor);
        this.processor.connect(this.context.destination);
        console.log("started");
    }
    stop() {
        this.microphone.disconnect();
        this.processor.disconnect();
        console.log("stopped");
    }
    getBlob(success) {
        this.worker.postMessage({ command: 'finish' });
        this.onsuccess = success;
    }
}
export { Recorder };
