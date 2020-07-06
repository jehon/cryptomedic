/* istanbul ignore file */

// Bootstrap 3.3 (https://getbootstrap.com/docs/4.0/getting-started/webpack/)
import jQuery from 'jquery/src/jquery.js';
window.jQuery = jQuery;
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './controllers/mainApp.js';

import './elements/jh-i18n.js';
import './elements/bugreporting.js';
import './elements/widgets/x-login-status.js';

import JHElement from './elements/jh-element.js';
window.JHElement = JHElement;
import './elements/x-overlay.js';
import './elements/x-waiting.js';
import './elements/x-waiting-folder.js';
import XRequestor from './elements/x-requestor.js';
window.XRequestor = XRequestor;
import './elements/x-requestor-crud.js';
import './elements/cryptomedic-data-service.js';

import './elements/jh-codage.js';
import './elements/jh-script.js';
import './elements/block-bill-category.js';
import './elements/block-bill-line.js';
import './elements/edit-price.js';
import './elements/x-inline.js';
import './elements/x-input-date.js';
import XInputPicture from './elements/x-input-picture.js';
window.XInputPicture = XInputPicture;
import './elements/x-patient-related.js';
import './elements/x-read.js';
import './elements/x-read-boolean.js';
import './elements/x-write.js';
import './elements/x-write-list.js';

import XFile from './elements/x-file.js';
window.XFile = XFile;
import './elements/x-file-bill.js';
import './elements/x-file-bill-summary.js';

import './elements/widgets/x-age.js';
import './elements/panels/x-group-panel.js';

import './css/application.css';
