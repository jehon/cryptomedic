import amd_stats from '../../js/amd_stats.js';

export function _evaluatePoly(line, x) {
    var i = -1;
    if ((x < line[0][0]) || (x > line[line.length - 1][0])) {
        return NaN;
    }
    for (i = 0; i < line.length; i++) {
        if (x <= line[i][0])
            break;
    }

    // i = the next indice (line[i-1] < x <= line[i])
    if (x == line[i][0]) return line[i][1];

    var xup = line[i][0];
    var yup = line[i][1];
    var xdw = line[i - 1][0];
    var ydw = line[i - 1][1];
    return ydw + (yup - ydw) * ((x - xdw) / (xup - xdw));
}

export function stdDeviation(line, x, y) {
    var avg = _evaluatePoly(line.medium, x);
    if (isNaN(avg)) throw 'Out of bound';
    if (y == avg) return 0;

    var ref;
    if (y < avg) {
        ref = _evaluatePoly(line.min, x);
    } else {
        ref = _evaluatePoly(line.max, x);
    }

    /* istanbul ignore next: this case is when the polynome is not fully completed */
    if (isNaN(ref)) throw 'Out of bound';

    var dev = Math.abs((avg - ref) / sigma);
    return (y - avg) / dev;
}

// TODO: remove stdDeviationString
/* istanbul ignore next */
export function stdDeviationString(line, x, y) {
    try {
        return stdDeviation(line, x, y);
    } catch (e) {
        return '#' + e + '#';
    }
}

// 1.64485 = sigma at 90 for normal distribution
export const sigma = 1.64485;

export default class XStandardDeviation extends HTMLElement {
    static get observedAttributes() {
        return ['sex', 'graph-name', 'x', 'y'];
    }

    constructor() {
        super();
        this.adapt();
    }

    attributeChangedCallback(attributeName, _oldValue, _newValue) {
        switch (attributeName) {
            case 'sex':
            case 'graph-name':
            case 'x':
            case 'y':
                this.adapt();
                break;
        }
    }

    adapt() {
        const sex = this.getAttribute('sex');
        const graphName = this.getAttribute('graph-name');
        const x = parseFloat(this.getAttribute('x'));
        const y = parseFloat(this.getAttribute('y'));

        if (!(sex in amd_stats)) {
            return this.setError('invalid_sex', 'Invalid Sex');
        }
        if (!(graphName in amd_stats[sex])) {
            return this.setError('invalid_graph_name', 'Invalid line');
        }
        if (isNaN(x)) {
            return this.setError('invalid_x', 'Invalid data x');
        }
        if (isNaN(y)) {
            return this.setError('invalid_y', 'Invalid data y');
        }

        try {
            const ds = stdDeviation(amd_stats[sex][graphName], x, y);
            this.innerHTML = '' + (Math.round(ds * 100) / 100);
        } catch (e) {
            this.setError('stats', e);
        }
    }

    setError(type, msg) {
        this.setAttribute('error', type);
        this.innerHTML = '#' + msg + '#';
    }
}

window.customElements.define('x-standard-deviation', XStandardDeviation);
