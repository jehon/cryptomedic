
import CRUD from './CRUD.js';
import { getPref } from '../js/prefs.js';

export default class FolderPage extends CRUD {
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
