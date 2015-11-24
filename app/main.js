'use strict';

import store from 'store';
import * as connection from 'actions/connection';

store.dispatch({ type: 'INCREMENT' });
// 1
store.dispatch({ type: 'INCREMENT' });
// 2
store.dispatch({ type: 'DECREMENT' });
// 1

let appState = {
  store: store,
  actions: {
    connection: {
      success: () => store.dispatch(connection.success()),
      failure: (httpErrorCode) => store.dispatch(connection.failure(httpErrorCode))
    }
  }
}

window.appState = appState;

export default appState;

// require('script!./static/js/bugreporting.js');
// require('script!./bower_components/jquery/dist/jquery.min.js');
// require('script!./bower_components/jquery-ui/jquery-ui.min.js');
// require('script!./bower_components/jquery-ui/themes/ui-lightness/jquery-ui.min.css');

// require('script!./bower_components/bootstrap/dist/js/bootstrap.min.js');
// require('script!./bower_components/bootstrap/dist/css/bootstrap.min.css');
// require('script!./bower_components/angular/angular.min.js');
// require('script!./bower_components/angular-route/angular-route.min.js');
// require('script!./bower_components/fetch/fetch.js');
// require('script!./bower_components/dexie/dist/latest/Dexie.min.js');


// require('script!./static/js/application.js');
// require('script!./static/js/database.js');
// require('script!./static/js/myfetch.js');
// require('script!./static/js/cryptomedic.js');
// require('script!./static/js/amd_stats_datas.js');
// require('script!./static/js/exceptions.js');
// require('script!./static/worker/worker.js');

// require('script!./static/js/html2canvas.js');
// require('./bower_components/excellentexport/excellentexport.min.js');

// require('script!./static/js/model_abstract.js');
// require('script!./static/js/model_data.js');
// require('script!./static/js/model_file.js');
// require('script!./static/js/model_file_bill.js');
// require('script!./static/js/model_file_clubfoot.js');
// require('script!./static/js/model_file_nonricketconsult.js');
// require('script!./static/js/model_file_picture.js');
// require('script!./static/js/model_file_surgery.js');

// require('script!./static/js/service_backend.js');
// require('script!./static/js/service_session_storage.js');

// require('script!./static/js/ctrl_allgraphics.js');
// require('script!./static/js/ctrl_file_bill.js');
// require('script!./static/js/ctrl_folder.js');
// require('script!./static/js/ctrl_graphic.js');
// require('script!./static/js/ctrl_home.js');
// require('script!./static/js/ctrl_offline.js');
// require('script!./static/js/ctrl_picture.js');
// require('script!./static/js/ctrl_reports.js');
// require('script!./static/js/ctrl_search.js');

// cryptomedic.version = 'webpack';
