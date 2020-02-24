
import { API_VERSION } from './config.js';
window.API_VERSION = API_VERSION;

import './elements/jh-i18n.js';
import nullify from './js/nullify.js';
window.nullify = nullify;

import date2Display from './js/date2Display.js';
window.date2Display = date2Display;

import date2CanonicString from './js/date2CanonicString.js';
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

import amd_stats from './js/amd_stats.js';
window.amd_stats = amd_stats;

import { evaluatePoly, stdDeviation, sigma } from './js/math.js';
import { fromBirthDate, toBirthDate, atConsultTime } from './js/age.js';
window.calculations = {
	math: { evaluatePoly, stdDeviation, sigma },
	age: { fromBirthDate, toBirthDate, atConsultTime }
};

import { formGetContent, formFillIn, formEvaluateFunctions, formSwitch } from './js/form.js';
window.formGetContent = formGetContent;
window.formFillIn = formFillIn;
window.formEvaluateFunctions = formEvaluateFunctions;
window.formSwitch = formSwitch;

import { setPref, getPref, extractPrefsFile } from './js/prefs.js';
window.setPref = setPref;
window.getPref = getPref;
window.extractPrefsFile = extractPrefsFile;

import getDataService from './js/getDataService.js';
window.getDataService = getDataService;

import template from './js/template.js';
window.template = template;

import goThere from './js/goThere.js';
window.goThere = goThere;

import CRUD from './models/CRUD.js';
window.CRUD = CRUD;

import FolderPage from './models/FolderPage.js';
window.FolderPage = FolderPage;

import PatientRelated from './models/PatientRelated.js';
window.PatientRelated = PatientRelated;



import './elements/bugreporting.js';

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

window.angular = angular;
window.jQuery = jQuery;
window.ExcellentExport = ExcellentExport;
window.FetchFull = fetchfull;
window.he = he;

/* For fetchfull v2 inline */
import objectPath from 'object-path';
window.objectPath = objectPath;
