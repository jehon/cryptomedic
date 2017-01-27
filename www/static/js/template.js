/* global API_VERSION */

function template(...names) {
  // console.log('requesting template: ' + names.join('_'));
  return '/api/' + API_VERSION + '/templates/' + names.join('_') + '.php';
}
