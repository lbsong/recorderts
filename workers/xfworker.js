(function () {
    'use strict';

    function RecognizeSpeech(buffer) {
        let blob = new Blob(buffer);

        let formData = new FormData();
        formData.append("buffer", blob);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:57591/api/rec", true);
        xhr.send(formData);
    }

    self.onmessage = function (ev) {
        switch (ev.data.command) {
            case "rec":
                let buffer = ev.data.buffer;
                RecognizeSpeech(buffer);
                break;
            default:
                console.log("The command is not supported yet" + ev.data.command);
                break;
        }
    }
})();