
import catalog from 'reducers/catalog';
import dispatch from 'actions/dispatch';

export default {
  downloading: function() {
    dispatch(catalog.DATABASE_DOWNLOADING)
  },

  downloaded: function() {
    dispatch(catalog.DATABASE_DOWNLOADED)
  },

  uploading: function(remaining) {
    dispatch(catalog.DATABASE_UPLOADING, remaining)
  },

  uploaded: function() {
    dispatch(catalog.DATABASE_UPLOADED)
  },

};
