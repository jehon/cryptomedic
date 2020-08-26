
/* istanbul ignore file */

import PatientRelated from './PatientRelated.js';
import { API_VERSION } from '../config.js';

export default class Picture extends PatientRelated {
    getModel() {
        return 'Picture';
    }

    getPictureUrl() {
        return '/api/' + API_VERSION + '/picture/' + this.id;
    }

    getThumbnailUrl() {
        return '/api/' + API_VERSION + '/picture/' + this.id + '/thumbnail';
    }

    validate(res) {
        res = super.validate(res);

        if (!this.fileContent && !this.file) {
            res.pictureRequired = true;
        }

        if ((this.Date > (new Date()).toISOString())) {
            res.dateInTheFuture = true;
        }
        return res;
    }
}
