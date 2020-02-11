
import './static/jh-i18n.js';
import nullify from './static/functions/nullify.js';
window.nullify = nullify;

import date2Display from './static/functions/date2Display.js';
window.date2Display = date2Display;

import date2CanonicString from './static/functions/date2CanonicString.js';
window.date2CanonicString = date2CanonicString;

// Angular 1.x
import angular from 'angular';
import 'angular-route';

// Bootstrap 3.3 (https://getbootstrap.com/docs/4.0/getting-started/webpack/)
import jQuery from 'jquery/src/jquery.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Redux
import { createStore, combineReducers } from 'redux';

// Export to excell
import ExcellentExport from 'excellentexport';

// Clone object clone(...)
import clone from 'clone';

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
window.redux = {
	createStore,
	combineReducers
};
window.ExcellentExport = ExcellentExport;
window.clone = clone;
window.FetchFull = fetchfull;
window.he = he;
window.html2canvas = html2canvas;
window.uuid = uuid;

/* For fetchfull v2 inline */
import objectPath from 'object-path';
window.objectPath = objectPath;
