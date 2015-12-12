
import catalog from 'reducers/catalog';
import dispatch from 'actions/dispatch';

export default {
  success: function() {
    dispatch(catalog.CONNECTION_SUCCESS)
  },

  settings: function(data) {
    dispatch(catalog.CONNECTION_SETTINGS, data)
    return data;
  },

  failed: function(httpErrorCode) {
    dispatch(catalog.CONNECTION_FAILED, httpErrorCode)
  },

  expired: function() {
    dispatch(catalog.CONNECTION_EXPIRED)
  },

  serverError: function() {
    dispatch(catalog.CONNECTION_SERVER_ERROR)
  },
};
