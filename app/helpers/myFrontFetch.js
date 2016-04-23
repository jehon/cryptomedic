
import catalog  from 'reducers/catalog';
import dispatch from 'reducers/dispatch';
// import database from 'helpers/database';
import myFetch  from 'helpers/myFetch';

export default function myFrontFetch(url, init, data) {
  return myFetch(url, init, data).then(
    function(json) {
      dispatch(catalog.CONNECTION_SUCCESS);
      if (json._offline) {
      //   return database.storeRecord({ record: json })
      // Store also the received record...
      //     .then(function() { return json; });
        delete(json._offline);
        return json;
      } else {
        return json;
      }
    }, function(httpErrorCode) {
    console.log('httperrorcode', httpErrorCode);
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
