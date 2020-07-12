
import XWithFile from '../abstract/x-with-file.js';
import { fromBirthDateTo } from './x-age.js';
import { defineCustomElement } from '../../js/custom-element.js';
import { stdDeviationFor } from '../../js/standard-deviation.js';

export default class XFffBmiSd extends XWithFile {
    formula() {
        const sd = stdDeviationFor(
            this.folder.getPatient().sexStr(),
            'bmi',
            fromBirthDateTo(this.folder.getPatient().Yearofbirth, this.file.Date),
            this.file.bmi()
        );

        return Math.round(sd * 10) / 10;
    }
}

defineCustomElement(XFffBmiSd);
