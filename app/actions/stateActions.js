
import catalog from 'reducers/catalog';
import dispatch from 'actions/dispatch';

export default {
  busy: function(msg) {
    dispatch(catalog.STATE_BUSY, msg)
  },

  ready: function() {
    dispatch(catalog.STATE_READY)
  },

  clear: function() {
    dispatch(catalog.STATE_CLEAR)
  }
};
