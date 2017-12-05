
// Custom Elements v1
import shadydom         from '@webcomponents/shadydom';

// Angular 1.x
import angular          from 'angular';
import angularRoute     from 'angular-route';

// Export to excell
import ExcellentExport  from 'excellentexport';

// Clone object clone(...)
import clone            from 'clone';

// html entities decode for jh-script

// Add objectPath to the library dynamically
// https://github.com/webpack-contrib/imports-loader
import fetchfull        from 'imports-loader?objectPath=object-path!fetchfull';
// import fetchfull        from 'fetchfull';

window.angular          = angular;
window.ExcellentExport  = ExcellentExport;
window.clone            = clone;
window.FetchFull        = fetchfull;
