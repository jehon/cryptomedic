
import ExcellentExport from '../../../node_modules/excellentexport/dist/excellentexport.js';
import { messages } from '../../config.js';
import { createElementWithObject, createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import { getRouteToFolderPatient, parseRouteReport } from '../../js/router.js';
import TableBuilder from '../../js/table-builder.js';
import XCodage from '../funcs/x-codage.js';
import XButton from '../render/x-button.js';
import XDisplayDate from '../render/x-display-date.js';
import XMessages from '../render/x-messages.js';
import XAge from '../x-age.js';

/**
 * Two parts here:
 * - query with parameters
 * - results to be instanciated by ?
 */

export default class XPageReports extends HTMLElement {

    /** @type {HTMLElement} */
    #result

    /** @type {HTMLAnchorElement} */
    #exportLink

    /** @type {XMessages} */
    #messages

    /** @type {Array<*>} */
    #data

    constructor() {
        super();

        // this.attachShadow({ mode: 'open' }); // TODO: remove shadow when fully migrated
        this.innerHTML = '';
        this.append(
            createElementWithTag('css-inherit'),
            createElementWithTag('style', {}, `
        `
            ),
            // Search pane
            createElementWithTag('slot'),

            this.#messages = createElementWithObject(XMessages),

            // Report result
            this.#result = createElementWithTag('div', { id: 'report_table' })
        );
        this.reset();
    }

    reset() {
        this.#result.innerHTML = '';
        this.#messages.clear();
        this.#messages.addMessage({
            text: 'Please press "refresh" to generate the report',
            level: messages.info
        });
    }

    set data(data) {
        // see generateXLS for other usage !

        this.#data = data;
        this.#messages.clear();

        const report = parseRouteReport();
        this.#result.innerHTML = '';
        if (!data || data.list.length < 1) {
            this.#messages.addMessage({
                text: 'No data found',
                level: messages.warning
            });
            return;
        }

        //
        // Export button
        //
        this.#result.append(
            createElementWithTag('div', { style: { textAlign: 'right' } }, [
                // createElementsFromHTML('<a style="display: none" id="report_download_button" download="export.xls">download</a>')[0],
                this.#exportLink = /** @type {HTMLAnchorElement} */ (createElementWithTag('a', { style: { display: 'none' }, download: 'test.xls' }, 'download')),
                createElementWithObject(XButton, { action: 'alternate' }, 'Export to Excel',
                    (el) => el.addEventListener('click', () => this.generateXLS())
                ),
            ])
        );

        const tableBuilder = new TableBuilder()
            .enrichTable({ class: 'reporting' }) // table table-hover table-bordered tablesorter
            .addData(data.list);
        reports[report.report].generator(tableBuilder, data);
        this.#result.append(tableBuilder.render());
    }

    generateXLS() {
        // TODO: check fixValue (see website) => on the fly filtering
        this.#result.querySelectorAll('.online').forEach(el => el.parentNode.removeChild(el));
        this.#result.querySelectorAll('a').forEach(el => el.parentNode.replaceChild(
            // document.createRange().createContextualFragment(`<span>${el.innerHTML}</span>`),
            createElementWithTag('span', {}, el.innerHTML),
            el
        ));
        this.#result.querySelectorAll('x-codage').forEach(el => el.parentNode.replaceChild(
            document.createRange().createContextualFragment(`<span>${el.getAttribute('calculated-translated')}</span>`),
            el
        ));

        // bug fix here: https://github.com/jmaister/excellentexport/issues/54
        ExcellentExport.excel(this.#exportLink,
            this.#result.getElementsByTagName('table')[0],
            'cryptomedic');

        this.#exportLink.click();

        // Refresh the table to recover links etc...
        this.data = this.#data;
    }
}

export const REPORT_SURGICAL = 'surgical';
export const REPORT_STATISTICAL = 'statistical';
export const REPORT_ACTIVITY = 'activity';
export const REPORT_CONSULTATIONS = 'consultations';

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
    generator: (_tableBuilder) => {
        // TODO: this report is currently unavailable
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
