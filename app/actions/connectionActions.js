
import catalog from 'reducers/catalog';
import dispatch from 'actions/dispatch';

export default {
  success: function() {
    dispatch(catalog.CONNECTION_SUCCESS)
  },

  failed: function(httpErrorCode) {
    dispatch(catalog.CONNECTION_FAILED, httpErrorCode)
  },

  expired: function() {
    dispatch(catalog.CONNECTION_EXPIRED)
  },
};
