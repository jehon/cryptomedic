'use strict';

import catalog              from 'reducers/catalog';
import dispatch             from 'reducers/dispatch';
import store                from 'reducers/store';

import create               from 'helpers/create';
import date2CanonicString   from 'helpers/date2CanonicString';
import Database             from 'helpers/database';
import myFetch              from 'helpers/myFetch';
import service_backend_fn   from 'helpers/service_backend';

import selectFile           from 'actions/selectFile';
import { DataMissingException } from 'helpers/exceptions';
import { ApplicationException } from 'helpers/exceptions';

let offline = require('offline-plugin/runtime');
if (location.pathname.split('/')[1] == 'offline') {
  console.log('SW-OFFLINE: Detecting offline mode, activating plugin');
  offline.install(null,
    function(data) { console.log('SW-OFFLINE: activated', data); },
    function(data) { console.error('SW-OFFLINE: problem', data); }
  );
}

let db = new Database();

export default function() {
  return {
    store: store,
    dispatch: dispatch,
    catalog: catalog,
    action: {
      selectFile
    },
    helpers: {
      // objectify,
      create,
      date2CanonicString,
      service_backend_fn,
      myFetch,
      db,
      DataMissingException,
      ApplicationException
      // nullify
    },
  };
}
