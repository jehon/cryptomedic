
import catalog from 'reducers/catalog';

catalog._define('DATABASE_DOWNLOADING');
catalog._define('DATABASE_DOWNLOADED');
catalog._define('DATABASE_UPLOADING');
catalog._define('DATABASE_UPLOADED');

export default function(state, action) {
  if (!state) {
    state = {
      downloading: true,
      uploading: 0
    };
  }
  if (action.type == catalog.DATABASE_DOWNLOADING) {
    return {
      downloading: true,
      uploading: state.uploading
    };
  };

  if (action.type == catalog.DATABASE_DOWNLOADED) {
    return {
      downloading: false,
      uploading: state.uploading
    };
  };

  if (action.type == catalog.DATABASE_UPLAODING) {
    return {
      downloading: state.downloading,
      uploading: action.payload
    };
  };

  if (action.type == catalog.DATABASE_UPLAODED) {
    return {
      downloading: state.downloading,
      uploading: 0
    };
  };

  return state;
}
