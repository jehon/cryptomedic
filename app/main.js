/* istanbul ignore file */
/* eslint-disable */

// Bootstrap 3.3 (https://getbootstrap.com/docs/4.0/getting-started/webpack/)
import jQuery from 'jquery/src/jquery.js';
window.jQuery = jQuery;
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './controllers/mainApp.js';

import './elements/bugreporting.js';

import './css/application.css';
