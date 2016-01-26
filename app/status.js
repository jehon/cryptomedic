'use strict';

import catalog from 'reducers/catalog';
import store from 'reducers/store';
import * as connection from 'actions/connectionActions';
import * as state from 'actions/stateActions';
import * as database from 'actions/databaseActions';

import objectify from 'helpers/objectify';
import create from 'helpers/create';
import date2CanonicString from 'helpers/date2CanonicString';


export default function() {
  return {
    store: store,
    actions: {
      connection,
      state,
      database
    },
    catalog: catalog,
    helpers: {
      objectify,
      create,
      date2CanonicString
    }
  };
}
