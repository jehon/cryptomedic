'use strict';

import catalog                  from 'reducers/catalog';
import dispatch                 from 'reducers/dispatch';
import store                    from 'reducers/store';

import date2CanonicString       from 'helpers/date2CanonicString';
import myFetch                  from 'helpers/myFetch';
import service_backend_fn       from 'helpers/service_backend';

import selectFile               from 'actions/selectFile';

import activateCache            from 'service-worker-registration';

let db = new Database();

if (location.protocol == 'https:') {
  if (location.pathname.split('/')[1] != 'online') {
    console.info('[SW] Detection: offline mode, activating plugin');
    activateCache();
  } else {
    console.info('[SW] Detection: online mode');
  }
} else {
  console.info('[SW] Detection: https not detcted, online mode');
}

export default function() {
  return {
    activateCache: activateCache,
    store: store,
    dispatch: dispatch,
    catalog: catalog,
    action: {
      selectFile
    },
    helpers: {
      date2CanonicString,
      service_backend_fn,
      myFetch,
      db,
    },
  };
}
