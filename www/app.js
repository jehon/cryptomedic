
import angular      from 'angular';
import angularRoute from 'angular-route';

// Custom Elements v1
// import cloudydom    from 'cloudydom';
import shadydom        from '@webcomponents/shadydom';

import ExcellentExport from 'excellentexport';
import clone           from 'clone';

console.log("bundle loading");

window.angular = angular;
window.ExcellentExport = ExcellentExport;
window.clone           = clone;

console.log("bundle loaded");
