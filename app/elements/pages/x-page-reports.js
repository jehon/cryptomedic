
import ExcellentExport from '../../../node_modules/excellentexport/dist/excellentexport.js';
import { messages } from '../../config.js';
import { createElementsFromHTML, createElementWithObject, createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import date2CanonicString from '../../js/date2CanonicString.js';
import { getPref, setPref } from '../../js/prefs.js';
import { getRouteToFolderFileByParams, getRouteToFolderPatient } from '../../js/router.js';
import { getSession } from '../../js/session.js';
import { toSentenceCase } from '../../js/string-utils.js';
import XCodage from '../funcs/x-codage.js';
import XForm from '../funcs/x-form.js';
import XInputList from '../funcs/x-input-list.js';
import XRequestor, { reportQueryBuilder } from '../funcs/x-requestor.js';
import XTable from '../funcs/x-table.js';
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

    /** @type {XTable} */
    _result

    /** @type {HTMLAnchorElement} */
    _exportLink

    /** @type {XMessages} */
    _messages

    /** @type {*} */
    _data

    /**
     * @returns {*} description of the report
     */
    getReportDescription() {
        return {
            dataTransform: (data) => data,
            ...reports[this.reportId]
        };
    }

    /**
     * @param {string} p parameter name
     * @returns {boolean} if the parameter is available
     */
    isParam(p) {
        return this.getReportDescription().params.indexOf(p) >= 0;
    }

    connectedCallback() {
        this.reportId = this.getAttribute('report');

        this.append(
            // TODO: only two-columns on large screens !
            createElementWithTag('style', {}, `

x-page-reports {
    width: 100%;
    display: flex;
}

x-page-reports > x-requestor,
x-page-reports > x-requestor > *
{
    width: 100%;
}

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

            this._requestor = createElementWithObject(XRequestor, { full: true }, [
                createElementWithTag('div', { class: 'top', full: true }, [
                    createElementWithTag('div', {}, [
                        createElementWithTag('h1', {}, this.getReportDescription().name),
                        createElementWithTag('div', {}, createElementsFromHTML(this.getReportDescription().description))
                    ]),
                    createElementWithTag('div', {}, [
                        createElementWithObject(XGroupPanel, { title: 'Parameters' }, [
                            this._form = createElementWithObject(XForm, {}, [
                                this._params = createElementWithTag('span'),
                                this._messages = createElementWithObject(XMessages),
                                createElementWithObject(XButtons, { slot: 'buttons' }, [
                                    createElementWithObject(XButton, { action: XButton.Search }),
                                    createElementWithObject(XButton, { action: XButton.Reset }),
                                ])
                            ], el => {
                                el.addEventListener(XForm.ActionSubmit, () => this.query());
                                el.addEventListener(XForm.ActionReset, () => this.reset());
                            })
                        ]),
                    ]),
                ]),
                createElementWithTag('div', { id: 'separator' }),

                // Report result
                createElementWithTag('div', { style: { textAlign: 'right' } }, [
                    // createElementsFromHTML('<a style="display: none" id="report_download_button" download="export.xls">download</a>')[0],
                    this._exportLink = /** @type {HTMLAnchorElement} */ (createElementWithTag('a', { style: { display: 'none' } }, 'download')),
                    createElementWithObject(XButton, { action: XButton.Alternate, id: 'export' }, 'Export to Excel',
                        (el) => el.addEventListener('click', () => this.generateXLS())
                    ),
                ]),
                this._result = createElementWithObject(XTable, { id: 'report_table' }, [],
                    (/** @type {XTable} */ el) => {
                        el
                            .enrichTable({ class: 'reporting' }); // table table-hover table-bordered tablesorter

                        this.getReportDescription().generator(el);
                    }
                )
            ])
        );

        //
        // Center
        //
        if (this.isParam('center')) {
            this._params.insertAdjacentElement('beforeend',
                createElementWithObject(XLabel, { label: 'Center' }, [
                    createElementWithObject(XInputList, { name: 'center', nullable: true, listName: 'Centers' })
                ])
            );
        }

        //
        // Examiner
        //
        if (this.isParam('examiner')) {
            this._params.insertAdjacentElement('beforeend',
                createElementWithObject(XLabel, { label: 'Examiner' }, [
                    createElementWithObject(XInputList, { name: 'examiner', nullable: true, listName: 'Examiner' })
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
                if (period == e) {
                    xlb.style.display = xlb.constructor.DISPLAY_MODE;
                    xlb.querySelectorAll('input').forEach(el => el.removeAttribute('disabled'));
                } else {
                    xlb.style.display = 'none';
                    xlb.querySelectorAll('input').forEach(el => el.setAttribute('disabled', 'disabled'));
                }
            });
        };

        // Period selector
        if (this.isParam('period')) {
            this._params.insertAdjacentElement('beforeend',
                createElementWithObject(XLabel, { label: 'Period' }, [
                    this._periodSelector = createElementWithObject(XInputList, { name: 'period', list: periodList, value: 'month' }, [],
                        // On change, show the correct input value
                        (/** @type {XInputList} */ el) => el.addEventListener('change', () => switchPeriod(el.value))
                    )
                ]));
        }

        if (this.isParam('period') || this.isParam('day')) {
            this._params.insertAdjacentElement('beforeend',
                createElementWithObject(XLabel, { label: 'Day', period: 'day' }, [
                    createElementWithObject(XInputDate, { name: 'day' })
                ]));
        }

        if (this.isParam('period') || this.isParam('month')) {
            this._params.insertAdjacentElement('beforeend',
                createElementWithObject(XLabel, { label: 'Month (yyyy-mm)', period: 'month' }, [
                    createElementWithTag('input', { name: 'month', pattern: '[0-9]{4}-[0-9]{1,2}', placeholder: 'yyyy-mm' })
                ]));
        }

        if (this.isParam('period') || this.isParam('year')) {
            this._params.insertAdjacentElement('beforeend',
                createElementWithObject(XLabel, { label: 'Year (yyyy)', period: 'year' }, [
                    createElementWithTag('input', { name: 'year', type: 'number', min: 1990, max: 2100 })
                ]));
        }

        if (this.isParam('period')) {
            switchPeriod(this._periodSelector.value);
        }

        //
        // Activity
        //
        if (this.isParam('activity')) {
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
        this._result.block('No data');
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
        for (var p in this.getReportDescription().params) {
            let n = this.getReportDescription().params[p];
            let v = newValues[n];
            if (n == 'period') {
                let pn = v;
                let pv = newValues[pn];
                prefs[pn] = pv;
            }
            prefs[n] = v;
        }
        setPref('report', prefs);

        if (this.getReportDescription().fixedParams) {
            Object.assign(newValues, this.getReportDescription().fixedParams);
        }

        // Check input data:
        if (this.isParam('period')) {
            let period = newValues['period'];
            let value = newValues[period];
            if (!value) {
                this._messages.addMessage({ text: `Invalid period (${period})`, level: messages.error });
                return;
            }
        }

        // Launch the call
        this._requestor.request(reportQueryBuilder(this.reportId, newValues))
            .then(response => response.data)
            // .then(data => {
            //     return {
            //         ...data,
            //         list: this.getReportDescription().dataTransform(data.list)
            //     };
            // })
            .then((data) => {
                this._messages.clear();

                /* For context */

                if (!data || data.list.length < 1) {
                    this._result.block();
                    return;
                }

                //
                // Export button
                //    Calculate the filename
                //
                let filename = `cryptomedic-${this.reportId}`;
                for (const i in this.getReportDescription().params) {
                    const p = this.getReportDescription().params[i];
                    if (data.params[p]) {
                        if (p == 'period') {
                            filename += '-' + data.params['when'];
                        } else {
                            filename += '-' + data.params[p].split(' ').join('_');
                        }
                    }
                }
                this._exportLink.setAttribute('download', filename + '.xls');
                this._result.setData(data.list, data);
            });
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
        // TODO: this.draw();
    }
}

defineCustomElement(XPageReports);

export const REPORT_SURGICAL = 'surgical';
export const REPORT_STATISTICAL = 'statistical';
export const REPORT_ACTIVITY = 'activity';
export const REPORT_CONSULTATIONS = 'consultations';

const reports = {};
reports[REPORT_ACTIVITY] = { // test data: 2014-05
    name: 'Activity (daily/monthly) Report',
    description: 'If you want to know your activity, choose this report.<br>'
        + 'Options: the day, and optionnaly the examiner, the center and type of activity (workshop / consult / surgical / ...).',
    params: ['period', 'center', 'examiner', 'activity'],
    generator: (xtable) => {
        // TODO: this is exactly the same as the SURGICAL REPORT but with a first line different (no "2")
        xtable
            .addHeaders(6)
            .addFooters(2)
            .addDetail((data, i) => createElementWithTag('a', { href: '#' + getRouteToFolderFileByParams(data.pid, 'Bill', data.bid) }, `#${i + 1}`), {
                headers: [
                    'N',
                    '',
                    (_col, context) => 'Daily report of ' + context.params.when,
                    'SARPV, CHAKARIA DISABILITY CENTER, CHAKARIA, COX\'S BAZAR',
                    'Name of the project: Rikces in cox\' Bazar',
                    'SARPV - AMD - KDM'
                ],
                footers: ['', '']
            })
            .addDetail('Date', { headers: ['Date'] })
            .addDetail('ExaminerName', { headers: ['Examiner'] })
            .addDetailLegacy(data => createElementWithObject(XCodage, { value: data.Center }), ['Place'])
            .addDetailLegacy('patient_reference', ['Record n#'])
            .addDetailLegacy('patient_name', ['Patient Name', 'Identity', 'Where', 'When', 'Who'])
            .addDetailLegacy(data => createElementWithObject(XAge, { value: data.yearofbirth, ref: data.Date }), ['Age', null, (_col, context) => context.params.center, (_col, context) => context.params.when, (_col, context) => context.params.examiner])
            .addDetailLegacy('Sex', ['M/F'])
            .addDetailLegacy((val, _i, context) => (val.oldPatient == 1)
                ? 'Old'
                : (val.patient_reference.substr(0, 4) < ('' + context.params.when).substr(0, 4)
                    ? 'Old(EN)'
                    : 'New'
                ), ['Old/New']
            )
            .addDetailLegacy('sl_familySalary', ['Tk income', 'SEL', '0 - 300', 0, 'Levels of the social level'])
            .addDetailLegacy('sl_numberOfHouseholdMembers', ['Nb pers'])
            .addDetailLegacy(data => Math.round(data.sl_familySalary / data.sl_numberOfHouseholdMembers), ['Tk per pers', null, '301-500', 1])
            .addDetailLegacy('Sociallevel', ['SL'])

            .addDetailLegacy(data => createElementWithObject(XCodage, { value: data.Pathology }), ['Diagno', 'Medical', '501-1500', 2])
            .addDetailLegacy('act', ['Act'])
            .addDetailLegacy('treatment', ['Trt', null, '1501-3000', 3])
            .addDetailLegacy('last_seen', ['Last seen', 'Surgical'])
            .addDetailLegacy('last_treat_result', ['Result', null, '3001-...', 4])
            .addDetailLegacy('last_treat_finished', ['Done ?', null])

            .addDetailLegacy(data => (data.complementary
                ? createElementWithObject(XCodage, { value: 'Money collected on bills from previous months', translated: 'Complementary payments' })
                : (data.price_consult ?? 0)
            ), ['Consult', 'Price', '', '', ''], ['total', (_col, context) => context.totals.price_consult])

            .addDetailLegacy(data => data.complementary ? null : (data.price_medecine ?? 0), ['Medicine'], [null, (_col, context) => context.totals.price_medecine])
            .addDetailLegacy(data => data.complementary ? null : (data.price_surgical ?? 0), ['Surgical'], [null, (_col, context) => context.totals.price_surgical])
            .addDetailLegacy(data => data.complementary ? null : (data.price_workshop ?? 0), ['Workshop'], [null, (_col, context) => context.totals.price_workshop])
            .addDetailLegacy(data => data.complementary ? null : (data.price_other ?? 0), ['Others'], [null, (_col, context) => context.totals.price_other])
            .addDetailLegacy(data => data.complementary ? null : (data.total_real ?? 0), ['Full'], [null, (_col, context) => context.totals.total_real])
            .addDetailLegacy(data => data.complementary ? null : (data.total_asked ?? 0), ['Asked'], [null, (_col, context) => context.totals.total_asked])
            .addDetailLegacy('total_paid', ['Paid'], [null, (_col, context) => context.totals.total_paid])
            .end();
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
    generator: (xtable) => {
        xtable
            .addHeaders(1)
            .addDetailLegacy('c_Center', ['Center'])
            .addDetailLegacy(data => createElementWithTag('a', { href: '#' + getRouteToFolderPatient(data.patient_id) }, `${data.entryyear}-${data.entryorder}`), ['Patient'])
            .addDetailLegacy('Name', ['Name'])
            .addDetailLegacy('Telephone', ['Phone'])
            .addDetailLegacy('ExaminerName', ['Appointment from'])
            .addDetailLegacy('purpose', ['Purpose'])
            .addDetailLegacy(data => createElementWithObject(XDisplayDate, { value: data.c_Date }), ['Appointment from'])
            .end();
    }
};

reports[REPORT_SURGICAL] = { // test data: 2014-01
    name: 'Surgical Report',
    description: 'Follow up of the surgical activity of the period',
    params: ['period'],
    // TODO: legend
    generator: (xtable) => {
        xtable
            .addHeaders(6)
            .addFooters(2)
            .addDetailLegacy((data, i) => createElementWithTag('a', { href: '#' + getRouteToFolderPatient(data.pid) }, `#${i + 1}`),
                [
                    'N',
                    '',
                    (_col, context) => 'Daily report of ' + context.params.when,
                    'SARPV, CHAKARIA DISABILITY CENTER, CHAKARIA, COX\'S BAZAR',
                    'Name of the project: Rikces in cox\' Bazar',
                    'SARPV - AMD - KDM 2'
                ],
                ['', '']
            )
            .addDetailLegacy('Date', ['Date'])
            .addDetailLegacy('ExaminerName', [''])
            .addDetailLegacy('Center', ['Place'])
            .addDetailLegacy('patient_reference', ['Record n#'])
            .addDetailLegacy('patient_name', ['Patient Name', 'Identity', 'Where', 'When', 'Who'])
            .addDetailLegacy(data => createElementWithObject(XAge, { value: data.yearofbirth }), ['Age', null, (_col, context) => context.params.center, (_col, context) => context.params.when, (_col, context) => context.params.examiner])
            .addDetailLegacy('Sex', ['M/F'])
            .addDetailLegacy((data, _i, context) => (data.oldPatient == 1)
                ? 'Old'
                : (data.patient_reference.substr(0, 4) < ('' + context.params.when).substr(0, 4)
                    ? 'Old(EN)'
                    : 'New'
                ), ['Old/New']
            )
            .addDetailLegacy('sl_familySalary', ['Tk income', 'SEL', '0 - 300', 0, 'Levels of the social level'])
            .addDetailLegacy('sl_numberOfHouseholdMembers', ['Nb pers'])
            .addDetailLegacy(data => Math.round(data.sl_familySalary / data.sl_numberOfHouseholdMembers), ['Tk per pers', null, '301-500', 1])
            .addDetailLegacy('Sociallevel', ['SL'])

            .addDetailLegacy(data => createElementWithObject(XCodage, { value: data.Pathology }), ['Diagno', 'Medical', '501-1500', 2])
            .addDetailLegacy('act', ['Act'])
            .addDetailLegacy('treatment', ['Trt', null, '1501-3000', 3])
            .addDetailLegacy('last_seen', ['Last seen', 'Surgical'])
            .addDetailLegacy('last_treat_result', ['Result', null, '3001-...', 4])
            .addDetailLegacy('last_treat_finished', ['Done ?', null])

            .addDetailLegacy('price_consult', ['Consult', 'Price', '', '', ''], ['total', (_col, context) => context.totals.price_consult])
            .addDetailLegacy('price_medecine', ['Medicine'], [null, (_col, context) => context.totals.price_medecine])
            .addDetailLegacy('price_surgical', ['Surgical'], [null, (_col, context) => context.totals.price_surgical])
            .addDetailLegacy('price_workshop', ['Workshop'], [null, (_col, context) => context.totals.price_workshop])
            .addDetailLegacy('price_other', ['Others'], [null, (_col, context) => context.totals.price_other])
            .addDetailLegacy('total_real', ['Full'], [null, (_col, context) => context.totals.total_real])
            .addDetailLegacy('total_asked', ['Asked'], [null, (_col, context) => context.totals.total_asked])
            .addDetailLegacy('total_paid', ['Paid'], [null, (_col, context) => context.totals.total_paid])
            .end();
    }
};

reports[REPORT_STATISTICAL] = { // test data:

    // TODO: this report is only an incredible hack !!!
    // Idea: https://stackoverflow.com/a/44092580/1954789

    name: 'Statistical Report',
    description: 'If you want to know the activity of the SARPV CDC on a period, choose this report',
    params: ['period', 'center', 'examiner'],
    generator: (xtable) => {
        const r = (nbr, n) => Math.round(nbr * Math.pow(10, n)) / Math.pow(10, n);
        const listings = getSession().lists;

        xtable.setData = function (data, context) {
            const params = context.params;

            xtable._overlay.free();
            xtable.removeAttribute('empty');
            xtable.setAttribute('count', '' + data?.length);


            xtable._element.append(
                createElementWithTag('tbody', {},
                    createElementsFromHTML(`
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
    `)

                )
            );
        };

        // dataTransform: (dataList) => {
        //     // dataList = { summary: {...}}

        //     const t = (label) => ({ title: true, label: label, value: null });
        //     const l = (label, value) => ({ title: false, label, value });

        //     const r = (nbr, n) => Math.round(nbr * Math.pow(10, n)) / Math.pow(10, n);
        //     const listings = getSession().lists;

        //     // TODO: should receive a list, and so remplacing here ctx.summary by data[period]
        //     return [

        //         t('Requested'),
        //         l('Period', (row, ctx) => ctx.params.when),

        //         t('Diagnostic'),
        //         l('If patient have multiple pathologies, he will be counted more than once', ''),
        //         l('Ricket consults', (_row) => dataList.summary.pathologies.rickets.total),
        //         l('Ricket consults (new only)', (_row) => dataList.summary.pathologies.rickets.new),
        //         l('Ricket consults (old only)', (_row) => dataList.summary.pathologies.rickets.old),
        //         l('Club Foots', (_row) => dataList.summary.pathologies.clubfoots.total),
        //         l('Club Foots (new only)', (_row) => dataList.summary.pathologies.clubfoots.new),
        //         l('Club Foots (old only)', (_row) => dataList.summary.pathologies.clubfoots.old),
        //         l('Polio', (_row) => dataList.summary.pathologies.polio.total),
        //         l('Burn', (_row) => dataList.summary.pathologies.burn.total),
        //         l('CP', (_row) => dataList.summary.pathologies.cp.total),
        //         l('Fracture', (_row) => dataList.summary.pathologies.fracture.total),
        //         l('Infection', (_row) => dataList.summary.pathologies.infection.total),
        //         l('Congenital', (_row) => dataList.summary.pathologies.congenital.total),
        //         l('Adult', (_row) => dataList.summary.pathologies.adult.total),
        //         l('Normal', (_row) => dataList.summary.pathologies.normal.total),
        //         l('Other', (_row) => dataList.summary.pathologies.other.total),
        //         l('All consultations', (_row) => dataList.summary.pathologies.total),

        //         t('Patients seen'),
        //         l('Number of patients seen', (_row) => dataList.summary.nbPatients),

        //         t('Social Level'),
        //         l('Family income (mean)', (_row) => r(dataList.summary.sociallevel.familyincome, 1)),
        //         l('Nb household mb (mean)', (_row) => r(dataList.summary.sociallevel.nbhousehold, 1)),
        //         l('ratio (mean)', (_row) => r(dataList.summary.sociallevel.familyincome / dataList.summary.sociallevel.nbhousehold, 2)),
        //         ...listings.SocialLevel.map(v => l(`Social Level ${v}`, (_row) => dataList.summary.sociallevel[v])),
        //         l('All social level together', (_row) => dataList.summary.sociallevel.total),

        //         t('Where'),
        //         // ...listings.Centers.map(v => `<tr><td>@<x-i18n value='${v}'></x-i18n>', (row, ctx) =>   ctx.summary.centers[v] ?? 0),
        //         l('center unspecified', (_row) => dataList.summary.centers.unspecified),

        //         t('Surgical activity'),
        //         ...Object.keys(dataList.summary.count.surgical).map(v => l(toSentenceCase(v), (_row) => dataList.summary.count.surgical[v])),

        //         t('Medical Activity'),
        //         ...Object.keys(dataList.summary.count.medecine).map(v => l(toSentenceCase(v), (_row) => dataList.summary.count.medecine[v])),

        //         t('Workshop Activity'),
        //         ...Object.keys(dataList.summary.count.workshop).map(v => l(toSentenceCase(v), (_row) => dataList.summary.count.workshop[v])),

        //         t('Consult Activity'),
        //         ...Object.keys(dataList.summary.count.consult).map(v => l(toSentenceCase(v), (_row) => dataList.summary.count.consult[v])),

        //         t('Other Activity'),
        //         ...Object.keys(dataList.summary.count.other).map(v => l(toSentenceCase(v), (_row) => dataList.summary.count.other[v])),

        //         t('Financials'),

        //         t('Surgery'),
        //         l('total_real', (_row) => dataList.summary.financials.surgery.real),
        //         l('total_asked', (_row) => dataList.summary.financials.surgery.asked),
        //         l('total_paid', (_row) => dataList.summary.financials.surgery.paid),
        //         l('total paid / total real', (_row) => r(dataList.summary.financials.surgery.paid / dataList.summary.financials.surgery.real, 2)),

        //         t(''),
        //         t('Medical (exl. above)'),
        //         l('total real', (_row) => dataList.summary.financials.medical.real),
        //         l('total asked', (_row) => dataList.summary.financials.medical.asked),
        //         l('total paid', (_row) => dataList.summary.financials.medical.paid),
        //         l('total paid / total real', (_row) => r(dataList.summary.financials.medical.paid / dataList.summary.financials.medical.real, 2)),

        //         t(''),
        //         t('Workshop (exl. above)'),
        //         l('total real', (_row) => dataList.summary.financials.workshop.real),
        //         l('total asked', (_row) => dataList.summary.financials.workshop.asked),
        //         l('total paid', (_row) => dataList.summary.financials.workshop.paid),
        //         l('total paid / total real', (_row) => r(dataList.summary.financials.workshop.paid / dataList.summary.financials.workshop.real, 2)),

        //         t(''),
        //         t('Consults (exl. above)'),
        //         l('total real', (_row) => dataList.summary.financials.consult.real),
        //         l('total asked', (_row) => dataList.summary.financials.consult.asked),
        //         l('total paid', (_row) => dataList.summary.financials.consult.paid),
        //         l('total paid / total real', (_row) => r(dataList.summary.financials.consult.paid / dataList.summary.financials.consult.real, 2)),

        //         t(''),
        //         t('Others (exl. above)'),
        //         l('total real', (_row) => dataList.summary.financials.other.real),
        //         l('total asked', (_row) => dataList.summary.financials.other.asked),
        //         l('total paid', (_row) => dataList.summary.financials.other.paid),
        //         l('total paid / total real', (_row) => r(dataList.summary.financials.other.paid / dataList.summary.financials.other.real, 2)),

        //         t(''),
        //         t('Grand Total'),
        //         l('total real', (_row) => dataList.summary.financials.total.real),
        //         l('total asked', (_row) => dataList.summary.financials.total.asked),
        //         l('total paid', (_row) => dataList.summary.financials.total.paid),
        //         l('total paid / total real', (_row) => r(dataList.summary.financials.total.paid / dataList.summary.financials.total.real, 2)),

        //         t(''),
        //     ];
    }
};
