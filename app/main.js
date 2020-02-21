
import './elements/jh-i18n.js';
import nullify from './functions/nullify.js';
window.nullify = nullify;

import date2Display from './functions/date2Display.js';
window.date2Display = date2Display;

import date2CanonicString from './functions/date2CanonicString.js';
window.date2CanonicString = date2CanonicString;

import { ApplicationException, DataMissingException, ConfigurationMissingException } from './js/exceptions.js';
window.ApplicationException = ApplicationException;
window.DataMissingException = DataMissingException;
window.ConfigurationMissingException = ConfigurationMissingException;

import TimedMap from './js/timedMap.js';
window.TimedMap = TimedMap;

import TwoColumns from './js/twoColumns.js';
window.TwoColumns = TwoColumns;

import store, {
	ACT_FOLDER_INVALIDATE,
	ACT_FOLDER_STORE,
	ACT_USER_LOGIN,
	ACT_USER_LOGOUT,
	ACT_DEFINITIONS_STORE
} from './js/store.js';
window.store = store;
window.ACT_FOLDER_INVALIDATE = ACT_FOLDER_INVALIDATE;
window.ACT_FOLDER_STORE = ACT_FOLDER_STORE;
window.ACT_USER_LOGIN = ACT_USER_LOGIN;
window.ACT_USER_LOGOUT = ACT_USER_LOGOUT;
window.ACT_DEFINITIONS_STORE = ACT_DEFINITIONS_STORE;

// Angular 1.x
import angular from 'angular';
import 'angular-route';

// Bootstrap 3.3 (https://getbootstrap.com/docs/4.0/getting-started/webpack/)
import jQuery from 'jquery/src/jquery.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Export to excell
import ExcellentExport from 'excellentexport';

// Add objectPath to the library dynamically
// https://github.com/webpack-contrib/imports-loader
import fetchfull from 'imports-loader?objectPath=object-path!fetchfull';
// import fetchfull        from 'fetchfull';

// html entities decode for jh-script
import he from 'he';

// Screenshots
import html2canvas from 'html2canvas';

import uuid from 'uuid/v4';

window.angular = angular;
window.jQuery = jQuery;
window.ExcellentExport = ExcellentExport;
window.FetchFull = fetchfull;
window.he = he;
window.html2canvas = html2canvas;
window.uuid = uuid;

/* For fetchfull v2 inline */
import objectPath from 'object-path';
window.objectPath = objectPath;
