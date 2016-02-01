'use strict';

import catalog from 'reducers/catalog';
import dispatch from 'reducers/dispatch';
import store from 'reducers/store';

import objectify from 'helpers/objectify';
import create from 'helpers/create';
import date2CanonicString from 'helpers/date2CanonicString';

var offline = require('offline-plugin/runtime');
if (location.pathname.split('/')[2] == 'offline') {
  console.log('SW-OFFLINE: Detecting offline mode, activating plugin');
  offline.install(null,
    function(data) { console.log('SW-OFFLINE: activated', data); },
    function(data) { console.error('SW-OFFLINE: problem', data); }
  );
}

export default function() {
  return {
    store: store,
    dispatch: dispatch,
    actions: {
    },
    catalog: catalog,
    helpers: {
      objectify,
      create,
      date2CanonicString
    }
  };
}
