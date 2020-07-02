
/* istanbul ignore file */
import { API_VERSION } from '../config.js';

export default function template(...names) {
    // console.log('requesting template: ' + names.join('_'));
    return '/api/' + API_VERSION + '/templates/' + names.join('_');
}
