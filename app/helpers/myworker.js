
var worker = false;

let listeners = [];

function onmessage(e) {
  for(var i = 0; i < listeners.length; i++) {
    listeners[i](e.data.name, e.data.data);
  }
}

export default class MyWorker {
  constructor(callback) {
    if (!worker) {
      worker = new (require('worker!../worker/worker.js'))();
      // var worker = new MyWorker();

      worker.onerror = function(e) {
        console.error('@service: Error in worker: ', e);
      };
      worker.onmessage = onmessage;
    }

    this.listener = callback;
    listeners.push(callback);
  }

  post(name, data) {
    worker.postMessage({ name: name, data: data });
    return data;
  }
}
