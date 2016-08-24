'use strict';

import catalog                  from 'reducers/catalog';
import dispatch                 from 'reducers/dispatch';
import store                    from 'reducers/store';

import date2CanonicString       from 'helpers/date2CanonicString';
import Database                 from 'helpers/database';
import myFetch                  from 'helpers/myFetch';
import service_backend_fn       from 'helpers/service_backend';

import selectFile               from 'actions/selectFile';
import { DataMissingException } from 'helpers/exceptions';
import { ApplicationException } from 'helpers/exceptions';

// function goOffline() {
//   let offline = require('offline-plugin/runtime');

//   // https://github.com/NekR/offline-plugin/blob/master/docs/updates.md
//   offline.install({
//     onInstalled: () => {
//       console.log('[SW] Event:', 'onInstalled');
//     },
//     onUpdating: () => {
//       console.log('[SW] Event:', 'onUpdating');
//     },
//     onUpdateReady: () => {
//       console.log('[SW] Event:', 'onUpdateReady');
//       // Tells to new [SW] to take control immediately
//       offline.applyUpdate();
//     },
//     onUpdated: () => {
//       console.log('[SW] Event:', 'onUpdated');
//       // Reload the webpage to load into the new version
//       window.location.reload();
//     },
//     onUpdateFailed: () => {
//       console.log('[SW] Event:', 'onUpdateFailed');
//     }
//   });
// }

import activateCache            from 'service-worker-registration';

let db = new Database();

if (location.pathname.split('/')[1] != 'online') {
  console.log('[SW] Detection: offline mode, activating plugin');
} else {
  console.log('[SW] Detection: online mode');
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
      DataMissingException,
      ApplicationException
    },
  };
}
