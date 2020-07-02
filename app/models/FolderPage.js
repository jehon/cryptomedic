
import CRUD from './CRUD.js';
import { getPref } from '../js/prefs.js';

export default class FolderPage extends CRUD {
    /**
     * Return an unique id for this file
     * based on file type and id
     *
     * TODO: should include patient_id ?
     *
     * @returns {string} an unique id
     */
    uid() {
        return `uid_${this.getModel()}_${this.id}`;
    }

    initFromCachedPreferences() {
        var c = getPref('file', {
            examinerName: '',
            center: '',
            date: ''
        });
        this.ExaminerName = c.examinerName;
        this.Center = c.center;
        this.Date = c.date;
    }

    isSet(field) {
        if (typeof (this[field]) == 'undefined') {
            return false;
        }
        if (this[field] == null) {
            return false;
        }
        return true;
    }

    isNotZero(field) {
        if (!this.isSet(field)) {
            return false;
        }
        if (this[field] === 0) {
            return false;
        }
        return true;
    }

    isLocked() {
        return false;
    }

    // eslint-disable-next-line jsdoc/require-returns-check
    /**
     * @returns {string} the model name
     */
    getModel() {
        throw 'You should define the getModel on each model';
    }

    getServerRessource() {
        return this.getModel().toLowerCase() + 's';
    }

    getRelated() {
        return {};
    }
}
