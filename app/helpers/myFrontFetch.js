
import catalog  from 'reducers/catalog';
import dispatch from 'reducers/dispatch';
import myFetch  from 'helpers/myFetch';
import MyWorker from 'helpers/myWorker';

export default function myFrontFetch({ url: url, init: init, data: data }) {
  return myFetch({ url: url, init: init, data: data })
  .then(
    (json) => {
      dispatch(catalog.CONNECTION_SUCCESS);
      if (json._offline) {
        // Send data to the worker...
        (new MyWorker()).store(json._offline);
        delete(json._offline);
      }
      return json;
    },
    (httpErrorCode) => {
      switch(httpErrorCode) {
        case 401: // unauthorized
          dispatch(catalog.CONNECTION_EXPIRED);
          location.hash = '#/login';
          break;
        case 403: // forbidden
          dispatch(catalog.CONNECTION_FAILED);
          break;
        case 404: // not found
          dispatch(catalog.CONNECTION_NOT_FOUND);
          break;
        case 500: // internal server error
          dispatch(catalog.CONNECTION_SERVER_ERROR);
          break;
        default:
          dispatch(catalog.CONNECTION_SERVER_ERROR);
          break;
      }
      return Promise.reject('myFrontFetch error: ' + httpErrorCode);
    }
  );
}
