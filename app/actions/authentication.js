import myFrontFetch from 'helpers/myFrontFetch';
import catalog      from 'reducers/catalog';
import dispatch     from 'reducers/dispatch';
import MyWorker     from 'helpers/myWorker';

var worker = new MyWorker();

export function loginCheck() {
  dispatch(catalog.STATE_BUSY, 'Checking your login/password with the online server');
  return myFrontFetch({ url: 'auth/settings', data: {
    'computerId': localStorage.cryptomedicComputerId
  }})
  .then(dispatch.bind(this, catalog.CONNECTION_SUCCESS))
  .then(dispatch.bind(this, catalog.CONNECTION_SETTINGS))
  .then(worker.post.bind(this, 'init'))
  .catch(dispatch.bind(this, catalog.CONNECTION_AUTH_FAILED))
  .myFinallyDone(function(data) {
    dispatch(catalog.STATE_READY);
    return data;
  });
}

export function login(username, password) {
  dispatch(catalog.STATE_BUSY, 'Checking your login/password with the online server');

  /* Initialize the computer id */
  if (!localStorage.cryptomedicComputerId) {
    var mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';
    for (var i = 0; i < 32; i++) {
      result += mask[Math.floor(Math.random() * mask.length)];
    }
    localStorage.cryptomedicComputerId = result;
  }

  return myFrontFetch({ url: 'auth/mylogin', init: { method: 'POST' }, data: {
    'username': username,
    'password': password,
    'computerId': localStorage.cryptomedicComputerId
  }})
  .then(dispatch.bind(this, catalog.CONNECTION_SUCCESS))
  .then(dispatch.bind(this, catalog.CONNECTION_SETTINGS))
  .then(worker.post.bind(this, 'init'))
  .catch(dispatch.bind(this, catalog.CONNECTION_AUTH_FAILED))
  .myFinallyDone(function(data) {
    dispatch(catalog.STATE_READY);
    return data;
  });
}

export function logout() {
  dispatch(catalog.STATE_BUSY, 'Disconnecting from the remote server');
  return myFrontFetch({ url: 'auth/logout' })
  .then(function(data) {
    dispatch(catalog.CONNECTION_EXPIRED);
    return data;
  })
  .myFinallyDone(function(data) {
    dispatch(catalog.STATE_READY);
    return data;
  });
}
