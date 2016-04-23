
var worker = new (require('worker!../worker/worker.js'))();
// var worker = new MyWorker();

worker.onerror = function(e) {
  console.error('@service: Error in worker: ', e);
};

export default class MyWorker {
  constructor(callback) {
    worker.onmessage = function(e) {
      callback(e.data.name, e.data.data);
    };
  }

  post(name, data) {
    worker.postMessage({ name: name, data: data });
    return data;
  }
}
