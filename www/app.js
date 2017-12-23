
// Custom Elements v1
import shadydom         from '@webcomponents/shadydom';

// Angular 1.x
import angular          from 'angular';
import angularRoute     from 'angular-route';


// Bootstrap 3.3 (https://getbootstrap.com/docs/4.0/getting-started/webpack/)
import jQuery           from 'jquery/src/jquery.js';
import 'bootstrap';
// require('bootstrap/dist/css/bootstrap.min.css');
import 'bootstrap/dist/css/bootstrap.min.css';

// Export to excell
import ExcellentExport  from 'excellentexport';

// Clone object clone(...)
import clone            from 'clone';

// Add objectPath to the library dynamically
// https://github.com/webpack-contrib/imports-loader
import fetchfull        from 'imports-loader?objectPath=object-path!fetchfull';
// import fetchfull        from 'fetchfull';

// html entities decode for jh-script
import he               from 'he';

window.jQuery           = jQuery;
window.angular          = angular;
window.ExcellentExport  = ExcellentExport;
window.clone            = clone;
window.FetchFull        = fetchfull;
window.he               = he;
