
import catalog from 'reducers/catalog';
import dispatch from 'actions/dispatch';

export default {
  success: function() {
    dispatch(catalog.CONNECTION_SUCCESS)
  },

  failed: function(httpErrorCode) {
    dispatch(catalog.FAILED, httpErrorCode)
  },

  disconnected: function() {
    dispatch(catalog.DISCONNECTED)
  },
};
