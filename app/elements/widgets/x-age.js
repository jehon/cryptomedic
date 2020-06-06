

export function fromBirthDate(birth, options) {
    if (birth == '' || birth == null) {
        return '';
    }
    options = Object.assign({}, {
        reference: new Date(),
        format: false
    }, options);
    // reference = reference || new Date();
    if (typeof (options.reference) == 'number') {
        options.reference = '' + options.reference;
    }
    if (typeof (options.reference) == 'string') {
        if (options.reference.length < 4) {
            return options.format ? null : '?';
            // throw new Exception('Invalid reference');
        }
        var ry = parseInt(options.reference.substring(0, 4));
        var rm = parseInt(options.reference.substring(5, 7));
        if (isNaN(rm)) {
            rm = 1; // emulate january
        }
        options.reference = new Date(ry, rm - 1, 1);
    }
    // reference is a Date

    if (typeof (birth) == 'number') {
        birth = '' + birth;
    }
    if (typeof (birth) == 'string') {
        if (birth.length < 4) {
            return options.format ? null : '?';
            // throw new Exception('Invalid birth');
        }
        var by = parseInt(birth.substring(0, 4));
        var bm = parseInt(birth.substring(5, 7));
        if (isNaN(bm)) {
            bm = 1; // emulate january
        }
        birth = new Date(by, bm - 1 - 1, 30);
    }
    // birth is a Date

    var days = new Date(0, 0, 0, 0, 0, 0, options.reference - birth);
    var res = { years: days.getFullYear() - 1900, months: days.getMonth() };
    if (options.format == 'object') {
        return res;
    }
    // Future default ? See fromBirthDateAsHumanReadable
    if (options.format == 'number') {
        return res.years + (res.months / 12);
    }
    // Default ?
    return res.years + 'y' + res.months + 'm';
}

export default class XAge extends HTMLElement {
    static get observedAttributes() {
        return ['value', 'ref'];
    }

    constructor() {
        super();
        this.adapt();
    }

    attributeChangedCallback(attributeName, _oldValue, _newValue) {
        this.adapt();
    }

    adapt() {
        const value = this.getAttribute('value');
        const ref = this.getAttribute('ref');


    }
}

window.customElements.define('x-age', XAge);
