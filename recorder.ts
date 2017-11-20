class Recorder {
    private worker: Worker;
    private context: AudioContext;
    private microphone: MediaStreamAudioSourceNode;
    private processor: ScriptProcessorNode;

    constructor(worker) {
        let _this = this;

        this.worker = worker;
        this.worker.onmessage = function (event) {
            switch (event.data.command) {
                case 'abc':
                    break;
                default:
                    break;
            }
        }

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
}

export { Recorder };