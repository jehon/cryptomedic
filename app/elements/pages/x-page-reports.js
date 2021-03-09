
import ExcellentExport from '../../../node_modules/excellentexport/dist/excellentexport.js';
import { actions, messages } from '../../config.js';
import { createElementWithObject, createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import date2CanonicString from '../../js/date2CanonicString.js';
import { getPref, setPref } from '../../js/prefs.js';
import { getRouteToFolderPatient, parseRouteReport } from '../../js/router.js';
import { getSession } from '../../js/session.js';
import { toSentenceCase } from '../../js/string-utils.js';
import TableBuilder from '../../js/table-builder.js';
import XCodage from '../funcs/x-codage.js';
import XForm from '../funcs/x-form.js';
import XInputList from '../funcs/x-input-list.js';
import XRequestor, { reportQueryBuilder } from '../funcs/x-requestor.js';
import XButton from '../render/x-button.js';
import XButtons from '../render/x-buttons.js';
import XDisplayDate from '../render/x-display-date.js';
import XGroupPanel from '../render/x-group-panel.js';
import XLabel from '../render/x-label.js';
import XMessages from '../render/x-messages.js';
import XAge from '../x-age.js';
import XInputDate from '../x-input-date.js';

/**
 * Two parts here:
 * - query with parameters
 * - results to be instanciated by ?
 */

export default class XPageReports extends HTMLElement {

    /** @type {XRequestor} */
    _requestor

    /** @type {XForm} */
    _form

    /** @type {HTMLElement} */
    _result

    /** @type {HTMLAnchorElement} */
    _exportLink

    /** @type {XMessages} */
    _messages

    /** @type {*} */
    _data

    constructor() {
        super();

        this.append(
            createElementWithTag('css-inherit'),

            // TODO: only two-columns on large screens !
            createElementWithTag('style', {}, `

@media screen and (min-width: 600px) {
    .top {
        display: flex;
        flex-direction: row;
    }

    .top > * {
        flex-basis: 1px;
        flex-grow: 1;
    }
}

#separator {
    height: 30px;
}

x-button#export {
    margin-bottom: 10px;
}
        `
            ),

            this._requestor = createElementWithObject(XRequestor, {}, [
                createElementWithTag('div', { class: 'top' }, [
                    createElementWithTag('div', {}, [
                        createElementWithTag('h1', {}, getReportDescription().name),
                        createElementWithTag('div', {}, getReportDescription().description)
                    ]),
                    createElementWithTag('div', {}, [
                        createElementWithObject(XGroupPanel, { title: 'Parameters' }, [
                            this._form = createElementWithObject(XForm, {}, [
                                this._params = createElementWithTag('span'),
                                this._messages = createElementWithObject(XMessages),
                                createElementWithObject(XButtons, {}, [
                                    createElementWithObject(XButton, { action: actions.query }, 'Search'),
                                    createElementWithObject(XButton, { action: actions.cancel }, 'Reset'),
                                ])
                            ], el => {
                                el.addEventListener('submit', () => this.query());
                                el.addEventListener('reset', () => this.reset());
                            })
                        ]),
                    ]),
                ]),
                createElementWithTag('div', { id: 'separator' }),

                // Report result
                this._result = createElementWithTag('div', { id: 'report_table' })
            ])
        );

        const isParam = (p) => getReportDescription().params.includes(p);

        //
        // Center
        //
        if (isParam('center')) {
            this._params.insertAdjacentElement('beforeend',
                createElementWithObject(XLabel, { label: 'Center' }, [
                    createElementWithObject(XInputList, { name: 'center', nullable: true, listName: 'Centers' })
                ])
            );
        }

        //
        // Examiner
        //
        if (isParam('examiner')) {
            this._params.insertAdjacentElement('beforeend',
                createElementWithObject(XLabel, { label: 'Examiner' }, [
                    createElementWithObject(XInputList, { name: 'examiner', listName: 'Examiner' })
                ])
            );
        }

        //
        // Period
        //
        //    fields can be set because of "period" or because they are explicitely wanted
        //    ex: day from consultation
        //
        const periodList = ['day', 'month', 'year'];
        const switchPeriod = (period) => {
            periodList.forEach((e) => {
                const xlb = /** @type {XLabel} */(this._params.querySelector(`x-label[period="${e}"]`));
                xlb.style.display = (period == e) ? xlb.constructor.DISPLAY_MODE : 'none';
            });
        };

        // Period selector
        if (isParam('period')) {
            this._params.insertAdjacentElement('beforeend',
                createElementWithObject(XLabel, { label: 'Period' }, [
                    this._periodSelector = createElementWithObject(XInputList, { name: 'period', list: periodList, value: 'month' }, [],
                        // On change, show the correct input value
                        (/** @type {XInputList} */ el) => el.addEventListener('change', () => switchPeriod(el.value))
                    )
                ]));
        }

        if (isParam('period') || isParam('day')) {
            this._params.insertAdjacentElement('beforeend',
                createElementWithObject(XLabel, { label: 'Day', period: 'day' }, [
                    createElementWithObject(XInputDate, { name: 'day' })
                ]));
        }

        if (isParam('period') || isParam('month')) {
            this._params.insertAdjacentElement('beforeend',
                createElementWithObject(XLabel, { label: 'Month (yyyy-mm)', period: 'month' }, [
                    createElementWithTag('input', { name: 'month', pattern: '[0-9]{4}-[0-9]{1,2}', placeholder: 'yyyy-mm' })
                ]));
        }

        if (isParam('period') || isParam('year')) {
            this._params.insertAdjacentElement('beforeend',
                createElementWithObject(XLabel, { label: 'Year (yyyy)', period: 'year' }, [
                    createElementWithTag('input', { name: 'year', type: 'number', min: 1990, max: 2100 })
                ]));
        }

        if (isParam('period')) {
            switchPeriod(this._periodSelector.value);
        }

        //
        // Activity
        //
        if (isParam('activity')) {
            this._params.insertAdjacentElement('beforeend',
                createElementWithObject(XLabel, { label: 'Activity' }, [
                    createElementWithObject(XInputList, { name: 'activity', nullable: true, list: ['consult', 'workshop', 'surgical'] })
                ])
            );
        }

        this.reset();
    }

    // TODO: warning on "year"

    empty() {
        this._messages.clear();
        this._result.innerHTML = '';
    }

    reset() {
        this.empty();
        this._messages.addMessage({
            text: 'Please press "refresh" to generate the report',
            level: messages.info
        });

        //
        // Reset values to saved preferences
        //

        const prefs = {
            center: '',
            examiner: '',
            period: 'month',
            activity: '',
            day: new Date(),
            month: date2CanonicString(new Date()).substring(0, 7),
            year: date2CanonicString(new Date()).substring(0, 4),
            ...getPref('report')
        };
        this._form.setValues(prefs);
    }

    query() {
        this.empty();

        const newValues = this._form.getValues();

        //
        // Set the preferences
        //
        var prefs = {};
        for (var p in getReportDescription().params) {
            let n = getReportDescription().params[p];
            let v = newValues[n];
            if (n == 'period') {
                let pn = v;
                let pv = newValues[pn];
                prefs[pn] = pv;
            }
            prefs[n] = v;
        }
        setPref('report', prefs);

        var dataGenerator = getReportId();
        if (typeof (getReportDescription().dataGenerator) != 'undefined') {
            // TODO: unify around reportId
            dataGenerator = getReportDescription().dataGenerator;
        }
        if (getReportDescription().fixedParams) {
            Object.assign(newValues, getReportDescription().fixedParams);
        }

        // Check input data:
        if (isParam('period')) {
            let period = newValues['period'];
            let value = newValues[period];
            if (!value) {
                this._messages.addMessage({ text: `Invalid period (${period})`, level: messages.error });
                return;
            }
        }

        // Launch the call
        this._requestor.request(reportQueryBuilder(dataGenerator, newValues))
            .then(response => response.data)
            .then((data) => {
                this._data = data;
                this.draw();
            });
    }

    draw() {
        this._messages.clear();

        this._result.innerHTML = '';
        if (!this._data || this._data.list.length < 1) {
            this._messages.addMessage({
                text: 'No data found',
                level: messages.warning
            });
            return;
        }

        //
        // Export button
        //    Calculate the filename
        //
        let filename = `cryptomedic-${getReportId()}`;
        for (const i in getReportDescription().params) {
            const p = getReportDescription().params[i];
            if (this._data.params[p]) {
                if (p == 'period') {
                    filename += '-' + this._data.params['when'];
                } else {
                    filename += '-' + this._data.params[p].split(' ').join('_');
                }
            }
        }

        this._result.append(
            createElementWithTag('div', { style: { textAlign: 'right' } }, [
                // createElementsFromHTML('<a style="display: none" id="report_download_button" download="export.xls">download</a>')[0],
                this._exportLink = /** @type {HTMLAnchorElement} */ (createElementWithTag('a', { style: { display: 'none' }, download: filename + '.xls' }, 'download')),
                createElementWithObject(XButton, { action: 'alternate', id: 'export' }, 'Export to Excel',
                    (el) => el.addEventListener('click', () => this.generateXLS())
                ),
            ])
        );

        const tableBuilder = new TableBuilder()
            .enrichTable({ class: 'reporting' }) // table table-hover table-bordered tablesorter
            .addData(this._data.list);
        getReportDescription().generator(tableBuilder, this._data);
        this._result.append(tableBuilder.render());
    }

    generateXLS() {
        // TODO: check fixValue (see website) => on the fly filtering
        this._result.querySelectorAll('[printing]').forEach(el => el.replaceWith(el.getAttribute('printing')));
        this._result.querySelectorAll('.online').forEach(el => el.parentNode.removeChild(el));
        this._result.querySelectorAll('a').forEach(el => el.parentNode.replaceChild(
            createElementWithTag('span', {}, el.innerHTML),
            el
        ));
        this._result.querySelectorAll('x-codage').forEach(el => el.parentNode.replaceChild(
            createElementWithTag('span', {}, [el.innerHTML]),
            el
        ));

        // bug fix here: https://github.com/jmaister/excellentexport/issues/54
        ExcellentExport.excel(this._exportLink,
            this._result.getElementsByTagName('table')[0],
            'cryptomedic');

        this._exportLink.click();

        // Refresh the table to recover links etc...
        this.draw();
    }
}

export const REPORT_SURGICAL = 'surgical';
export const REPORT_STATISTICAL = 'statistical';
export const REPORT_ACTIVITY = 'activity';
export const REPORT_CONSULTATIONS = 'consultations';

/**
 * Get the technical report name
 *
 * @returns {string} id
 */
function getReportId() {
    return parseRouteReport().report;

}

/**
 * @returns {*} description of the report
 */
function getReportDescription() {
    return reports[getReportId()];
}

/**
 * @param {string} p parameter name
 *
 * @returns {boolean} if the parameter is available
 */
function isParam(p) {
    return getReportDescription().params.indexOf(p) >= 0;
}

const reports = {};
reports[REPORT_ACTIVITY] = { // test data: 2014-05
    name: 'Activity (daily/monthly) Report',
    description: 'If you want to know your activity, choose this report.<br>'
        + 'Options: the day, and optionnaly the examiner, the center and type of activity (workshop / consult / surgical / ...).<br>',
    params: ['period', 'center', 'examiner', 'activity'],
    generator: (tableBuilder, data) => {
        // TODO: this is exactly the same as the SURGICAL REPORT but with a first line different (no "2")
        const params = data.params;
        tableBuilder
            .addHeaders(6)
            .addFooters(2)
            .addColumn((data, i) => createElementWithTag('a', { href: '#' + getRouteToFolderPatient(data.pid) }, `#${i + 1}`),
                [
                    'N',
                    '',
                    'Daily report of ' + params.when,
                    'SARPV, CHAKARIA DISABILITY CENTER, CHAKARIA, COX\'S BAZAR',
                    'Name of the project: Rikces in cox\' Bazar',
                    'SARPV - AMD - KDM'
                ],
                ['', '']
            )
            .addColumn('Date', ['Date'])
            .addColumn('ExaminerName', ['Examiner'])
            .addColumn((data) => createElementWithObject(XCodage, { value: data.Center }), ['Place'])
            .addColumn('patient_reference', ['Record n#'])
            .addColumn('patient_name', ['Patient Name', 'Identity', 'Where', 'When', 'Who'])
            .addColumn(data => createElementWithObject(XAge, { value: data.yearofbirth, ref: data.Date }), ['Age', null, params.center, params.when, params.examiner])
            .addColumn('Sex', ['M/F'])
            .addColumn(data => (data.oldPatient == 1)
                ? 'Old'
                : (data.patient_reference.substr(0, 4) < ('' + params.when).substr(0, 4)
                    ? 'Old(EN)'
                    : 'New'
                ), ['Old/New']
            )
            .addColumn('sl_familySalary', ['Tk income', 'SEL', '0 - 300', 0, 'Levels of the social level'])
            .addColumn('sl_numberOfHouseholdMembers', ['Nb pers'])
            .addColumn(data => Math.round(data.sl_familySalary / data.sl_numberOfHouseholdMembers), ['Tk per pers', null, '301-500', 1])
            .addColumn('Sociallevel', ['SL'])

            .addColumn((data) => createElementWithObject(XCodage, { value: data.Pathology }), ['Diagno', 'Medical', '501-1500', 2])
            .addColumn('act', ['Act'])
            .addColumn('treatment', ['Trt', null, '1501-3000', 3])
            .addColumn('last_seen', ['Last seen', 'Surgical'])
            .addColumn('last_treat_result', ['Result', null, '3001-...', 4])
            .addColumn('last_treat_finished', ['Done ?', null])

            .addColumn(data => (data.complementary
                ? createElementWithObject(XCodage, { value: 'Money collected on bills from previous months', translated: 'Complementary payments' })
                : (data.price_consult ?? 0)
            ), ['Consult', 'Price', '', '', ''], ['total', data.totals.price_consult])

            .addColumn(data => data.complementary ? null : (data.price_medecine ?? 0), ['Medicine'], [data.totals.price_medecine])
            .addColumn(data => data.complementary ? null : (data.price_surgical ?? 0), ['Surgical'], [data.totals.price_surgical])
            .addColumn(data => data.complementary ? null : (data.price_workshop ?? 0), ['Workshop'], [data.totals.price_workshop])
            .addColumn(data => data.complementary ? null : (data.price_other ?? 0), ['Others'], [data.totals.price_other])
            .addColumn(data => data.complementary ? null : (data.total_real ?? 0), ['Full'], [data.totals.total_real])
            .addColumn(data => data.complementary ? null : (data.total_asked ?? 0), ['Asked'], [data.totals.total_asked])
            .addColumn('total_paid', ['Paid'], [data.totals.total_paid]);
    }
};

reports[REPORT_CONSULTATIONS] = { // test data: 2015-04-28
    name: 'Consultations planned',
    description: 'List of consultations planned on a specific day in a specific center.<br>'
        + 'See also the button in the menu<br>'
        + 'Options: the day and the center.',
    params: ['day', 'center'],
    fixedParams: {
        period: 'day'
    },
    generator: (tableBuilder) => {
        tableBuilder
            .addHeaders(1)
            .addColumn('c_Center', ['Center'])
            .addColumn(data => createElementWithTag('a', { href: '#' + getRouteToFolderPatient(data.patient_id) }, `${data.entryyear}-${data.entryorder}`), ['Patient'])
            .addColumn('Name', ['Name'])
            .addColumn('Telephone', ['Phone'])
            .addColumn('ExaminerName', ['Appointment from'])
            .addColumn('purpose', ['Purpose'])
            .addColumn(data => createElementWithObject(XDisplayDate, { value: data.c_Date }), ['Appointment from']);
    }
};

reports[REPORT_STATISTICAL] = { // test data:
    name: 'Statistical Report',
    description: 'If you want to know the activity of the SARPV CDC on a period, choose this report',
    params: ['period', 'center', 'examiner'],
    dataGenerator: 'statistical',
    generator: (tableBuilder, data) => {
        // Break everything
        tableBuilder._element.querySelector('tbody').innerHTML = statistical(data.list, data.params);
    }
};

reports[REPORT_SURGICAL] = { // test data: 2014-01
    name: 'Surgical Report',
    description: 'Follow up of the surgical activity of the period',
    params: ['period'],
    dataGenerator: 'surgical',
    // TODO: legend
    generator: (tableBuilder, data) => {
        const params = data.params;
        tableBuilder
            .addHeaders(6)
            .addFooters(2)
            .addColumn((data, i) => createElementWithTag('a', { href: '#' + getRouteToFolderPatient(data.pid) }, `#${i + 1}`),
                [
                    'N',
                    '',
                    'Daily report of ' + params.when,
                    'SARPV, CHAKARIA DISABILITY CENTER, CHAKARIA, COX\'S BAZAR',
                    'Name of the project: Rikces in cox\' Bazar',
                    'SARPV - AMD - KDM 2'
                ],
                ['', '']
            )
            .addColumn('Date', ['Date'])
            .addColumn('ExaminerName', [''])
            .addColumn('Center', ['Place'])
            .addColumn('patient_reference', ['Record n#'])
            .addColumn('patient_name', ['Patient Name', 'Identity', 'Where', 'When', 'Who'])
            .addColumn(data => createElementWithObject(XAge, { value: data.yearofbirth }), ['Age', null, params.center, params.when, params.examiner])
            .addColumn('Sex', ['M/F'])
            .addColumn(data => (data.oldPatient == 1)
                ? 'Old'
                : (data.patient_reference.substr(0, 4) < ('' + params.when).substr(0, 4)
                    ? 'Old(EN)'
                    : 'New'
                ), ['Old/New']
            )
            .addColumn('sl_familySalary', ['Tk income', 'SEL', '0 - 300', 0, 'Levels of the social level'])
            .addColumn('sl_numberOfHouseholdMembers', ['Nb pers'])
            .addColumn(data => Math.round(data.sl_familySalary / data.sl_numberOfHouseholdMembers), ['Tk per pers', null, '301-500', 1])
            .addColumn('Sociallevel', ['SL'])

            .addColumn((data) => createElementWithObject(XCodage, { value: data.Pathology }), ['Diagno', 'Medical', '501-1500', 2])
            .addColumn('act', ['Act'])
            .addColumn('treatment', ['Trt', null, '1501-3000', 3])
            .addColumn('last_seen', ['Last seen', 'Surgical'])
            .addColumn('last_treat_result', ['Result', null, '3001-...', 4])
            .addColumn('last_treat_finished', ['Done ?', null])

            .addColumn('price_consult', ['Consult', 'Price', '', '', ''], ['total', data.totals.price_consult])
            .addColumn('price_medecine', ['Medicine'], [data.totals.price_medecine])
            .addColumn('price_surgical', ['Surgical'], [data.totals.price_surgical])
            .addColumn('price_workshop', ['Workshop'], [data.totals.price_workshop])
            .addColumn('price_other', ['Others'], [data.totals.price_other])
            .addColumn('total_real', ['Full'], [data.totals.total_real])
            .addColumn('total_asked', ['Asked'], [data.totals.total_asked])
            .addColumn('total_paid', ['Paid'], [data.totals.total_paid]);
    }
};

defineCustomElement(XPageReports);


/**
 * @param {*} data for the report
 * @param {*} params for the report
 *
 * @returns {string} as the table content
 */
function statistical(data, params) {
    const r = (nbr, n) => Math.round(nbr * Math.pow(10, n)) / Math.pow(10, n);

    // result.summary => data.summary

    const listings = getSession().lists;

    return `
<tr><td colspan="2" class="subheader">Requested</td></tr>
<tr><td>Period</td><td>${params.when}</td></tr>

<tr><td colspan="2" class="subheader">Diagnostic</td></tr>
<tr><td>If patient have multiple pathologies, he will be counted more than once</td><td></td></tr>
<tr><td>Ricket consults</td><td>${data.summary.pathologies.rickets.total}</td></tr>
<tr><td>Ricket consults (new only)</td><td>${data.summary.pathologies.rickets.new}</td></tr>
<tr><td>Ricket consults (old only)</td><td>${data.summary.pathologies.rickets.old}</td></tr>
<tr><td>Club Foots</td><td>${data.summary.pathologies.clubfoots.total}</td></tr>
<tr><td>Club Foots (new only)</td><td>${data.summary.pathologies.clubfoots.new}</td></tr>
<tr><td>Club Foots (old only)</td><td>${data.summary.pathologies.clubfoots.old}</td></tr>
<tr><td>Polio</td><td>${data.summary.pathologies.polio.total}</td></tr>
<tr><td>Burn</td><td>${data.summary.pathologies.burn.total}</td></tr>
<tr><td>CP</td><td>${data.summary.pathologies.cp.total}</td></tr>
<tr><td>Fracture</td><td>${data.summary.pathologies.fracture.total}</td></tr>
<tr><td>Infection</td><td>${data.summary.pathologies.infection.total}</td></tr>
<tr><td>Congenital</td><td>${data.summary.pathologies.congenital.total}</td></tr>
<tr><td>Adult</td><td>${data.summary.pathologies.adult.total}</td></tr>
<tr><td>Normal</td><td>${data.summary.pathologies.normal.total}</td></tr>
<tr><td>Other</td><td>${data.summary.pathologies.other.total}</td></tr>
<tr><td>All consultations</td><td>${data.summary.pathologies.total}</td></tr>

<tr><td colspan="2" class="subheader">Patients seen</td></tr>
<tr><td>Number of patients seen</td><td>${data.summary.nbPatients}</td></tr>

<tr><td colspan="2" class="subheader">Social Level</td></tr>
<tr><td>Family income (mean)</td><td>${r(data.summary.sociallevel.familyincome, 1)}</td ></tr>
<tr><td>Nb household mb (mean)</td><td>${r(data.summary.sociallevel.nbhousehold, 1)}</td ></tr >
<tr><td>ratio (mean)</td><td>${r(data.summary.sociallevel.familyincome / data.summary.sociallevel.nbhousehold, 2)}</td ></tr >
${listings.SocialLevel.map(v => `<tr><td>Social Level ${v}</td><td>${data.summary.sociallevel[v]}</td></tr>`).join('\n')}
<tr><td>All social level together</td><td>${data.summary.sociallevel.total}</td></tr>

<tr><td colspan="2" class="subheader">Where</td></tr>
${listings.Centers.map(v => `<tr><td>@<x-i18n value='${v}'></x-i18n></td><td>${data.summary.centers[v] ?? 0}</td></tr>`).join('\n')}
<tr><td>center unspecified</td><td>${data.summary.centers.unspecified}</td></tr>

<tr><td colspan="2" class="subheader">Surgical activity</td></tr>
${Object.keys(data.summary.count.surgical).map(v => `<tr><td>${toSentenceCase(v)}</td><td>${data.summary.count.surgical[v]}</td></tr>`).join('\n')}

<tr><td colspan="2" class="subheader">Medical Activity</td></tr>
${Object.keys(data.summary.count.medecine).map(v => `<tr><td>${toSentenceCase(v)}</td><td>${data.summary.count.medecine[v]}</td></tr>`).join('\n')}

<tr><td colspan="2" class="subheader">Workshop Activity</td></tr>
${Object.keys(data.summary.count.workshop).map(v => `<tr><td>${toSentenceCase(v)}</td><td>${data.summary.count.workshop[v]}</td></tr>`).join('\n')}

<tr><td colspan="2" class="subheader">Consult Activity</td></tr>
${Object.keys(data.summary.count.consult).map(v => `<tr><td>${toSentenceCase(v)}</td><td>${data.summary.count.consult[v]}</td></tr>`).join('\n')}

<tr><td colspan="2" class="subheader">Other activity</td></tr>
${Object.keys(data.summary.count.other).map(v => `<tr><td>${toSentenceCase(v)}</td><td>${data.summary.count.other[v]}</td></tr>`).join('\n')}

<tr><td colspan="2" class="subheader">Financials</td></tr>

<tr><td colspan="2" class="subheader">Surgery</td></tr>
<tr><td>total_real</td><td>${data.summary.financials.surgery.real}</td></tr>
<tr><td>total_asked</td><td>${data.summary.financials.surgery.asked}</td></tr>
<tr><td>total_paid</td><td>${data.summary.financials.surgery.paid}</td></tr>
<tr><td>total paid / total real</td><td>${r(data.summary.financials.surgery.paid / data.summary.financials.surgery.real, 2)}</td ></tr >

<tr><td colspan="2" class="subheader"></td></tr>
<tr><td colspan="2" class="subheader">Medical (exl. above)</td></tr>
<tr><td>total real</td><td>${data.summary.financials.medical.real}</td></tr>
<tr><td>total asked</td><td>${data.summary.financials.medical.asked}</td></tr>
<tr><td>total paid</td><td>${data.summary.financials.medical.paid}</td></tr>
<tr><td>total paid / total real</td><td>${r(data.summary.financials.medical.paid / data.summary.financials.medical.real, 2)}</td ></tr >

<tr><td colspan="2" class="subheader"></td></tr>
<tr><td colspan="2" class="subheader">Workshop (exl. above)</td></tr>
<tr><td>total real</td><td>${data.summary.financials.workshop.real}</td></tr>
<tr><td>total asked</td><td>${data.summary.financials.workshop.asked}</td></tr>
<tr><td>total paid</td><td>${data.summary.financials.workshop.paid}</td></tr>
<tr><td>total paid / total real</td><td>${r(data.summary.financials.workshop.paid / data.summary.financials.workshop.real, 2)}</td ></tr >

<tr><td colspan="2" class="subheader"></td></tr>
<tr><td colspan="2" class="subheader">Consults (exl. above)</td></tr>
<tr><td>total real</td><td>${data.summary.financials.consult.real}</td></tr>
<tr><td>total asked</td><td>${data.summary.financials.consult.asked}</td></tr>
<tr><td>total paid</td><td>${data.summary.financials.consult.paid}</td></tr>
<tr><td>total paid / total real</td><td>${r(data.summary.financials.consult.paid / data.summary.financials.consult.real, 2)}</td ></tr >

<tr><td colspan="2" class="subheader"></td></tr>
<tr><td colspan="2" class="subheader">Others (exl. above)</td></tr>
<tr><td>total real</td><td>${data.summary.financials.other.real}</td></tr>
<tr><td>total asked</td><td>${data.summary.financials.other.asked}</td></tr>
<tr><td>total paid</td><td>${data.summary.financials.other.paid}</td></tr>
<tr><td>total paid / total real</td><td>${r(data.summary.financials.other.paid / data.summary.financials.other.real, 2)}</td ></tr >

<tr><td colspan="2" class="subheader"></td></tr>
<tr><td colspan="2" class="subheader">Grand Total</td></tr>
<tr><td>total real</td><td>${data.summary.financials.total.real}</td></tr>
<tr><td>total asked</td><td>${data.summary.financials.total.asked}</td></tr>
<tr><td>total paid</td><td>${data.summary.financials.total.paid}</td></tr>
<tr><td>total paid / total real</td><td>${r(data.summary.financials.total.paid / data.summary.financials.total.real, 2)}</td ></tr >

<tr><td colspan="2" class="subheader"></td></tr>
`;
}