export default function template(...names) {
  // console.log('requesting template: ' + names.join('_'));
  return "/api/templates/" + names.join("_");
}
