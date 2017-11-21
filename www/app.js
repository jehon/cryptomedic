
import angular      from 'angular';
import angularRoute from 'angular-route';

// Custom Elements v1
// import cloudydom    from 'cloudydom';
import shadydom     from '@webcomponents/shadydom';

import ExcellentExport from 'excellentexport';

console.log("bundle loading");

window.angular = angular;
window.ExcellentExport = ExcellentExport;

console.log("bundle loaded");
