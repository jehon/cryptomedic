
export default function template(...names) {
  // console.log('requesting template: ' + names.join('_'));
  return '/api/v1.0/templates/' + names.join('_') + '.php';
}
