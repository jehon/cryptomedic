
import { actions } from '../../config.js';
import { createElementsFromHTML, createElementWithObject, createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import { getRouteToFolderPatient, setRoute } from '../../js/router.js';
import XForm from '../funcs/x-form.js';
import XRequestor, { patientSearchBuilder } from '../funcs/x-requestor.js';
import XTable from '../funcs/x-table.js';
import XButton from '../render/x-button.js';
import XButtons from '../render/x-buttons.js';
import XGroupPanel from '../render/x-group-panel.js';
import XPanel from '../render/x-panel.js';
import '../x-write-list.js';

export default class XPageSearch extends HTMLElement {
    constructor() {
        super();
        this.append(
            createElementWithTag('css-inherit'),
            createElementWithTag('style', {}, `
/* no style defined */
            `),
            ...createElementsFromHTML('<h1><img src=\'/static/img/patientsSearch.gif\'>Search for a patient</h1>'),
            this._requestor = createElementWithObject(XRequestor, {}, [
                createElementWithObject(XPanel, {}, [
                    createElementWithObject(XGroupPanel, { title: 'Search criteria', style: { width: 'min(50%, 400px)' } },
                        [
                            createElementWithObject(XPanel, {},
                                [
                                    this._form = createElementWithObject(XForm, {},
                                        [
                                            ...createElementsFromHTML(`
						<table>
							<tr>
								<td>Entry Year</td>
								<td><input type='number' name='entryyear' class='form-control' /></td>
							</tr>
							<tr>
								<td>Entry Order</td>
								<td><input type='number' name='entryorder' class='form-control' /></td>
							</tr>
							<tr>
								<td>Name</td>
								<td><input name='Name' class='form-control' /></td>
							</tr>
							<tr>
								<td>Sex</td>
								<td>
									<x-write-list name='Sex' list-name='Sex' list='' nullable></x-write-list>
								</td>
							</tr>
							<tr>
								<td>Year of birth</td>
								<td><input name='Yearofbirth' class='form-control' /></td>
							</tr>
							<tr>
								<td>Telephone</td>
								<td><input name='Telephone' class='form-control' /></td>
							</tr>
							<tr>
								<td>Main Pathology</td>
								<td>
									<x-write-list name='Pathology' list-name='Pathologies' list='' nullable></x-write-list>
								</td>
							</tr>
						</table>
`
                                            ),
                                            createElementWithObject(XButtons, { slot: 'buttons' }, [
                                                createElementWithObject(XButton, { action: actions.query }, 'Search'),
                                                createElementWithObject(XButton, { action: actions.cancel }, 'Reset')
                                            ])
                                        ],
                                        (el) => {
                                            el.addEventListener('submit', () => this.search());
                                            el.addEventListener('reset', () => this.reset());
                                        }
                                    ),
                                ]),
                        ]),
                    createElementWithTag('h1', {}, 'Results'),
                    ...createElementsFromHTML('<div style="text-align: center; color: red">Only the first 100 results are shown</div>'),
                    this._result = createElementWithObject(XTable, { id: 'search_results', full: true }, [],
                        (/** @type {XTable} */ el) => {
                            el
                                .addHeaders(1)
                                .enrichTable({ id: 'search_results', class: 'table table-hover table-bordered tablesorter' })
                                .addRowFormatting((el, data) => el.addEventListener('click', () => setRoute(getRouteToFolderPatient(data.id))))

                                .addColumn(() => createElementWithTag('img', { src: '/static/img/go.gif' }), [''])
                                .addColumn(data => data.entryyear + '-' + data.entryorder, ['Reference'])
                                .addColumn('Name', ['Name'])
                                .addColumn('Sex', ['Sex'])
                                .addColumn('Yearofbirth', ['Year of Birth'])
                                .addColumn('Telephone', ['Telephone'])
                                .addColumn('Pathology', ['Pathology']);
                        }),
                ])
            ])
        );
        this.reset();
    }

    reset() {
        this._result.block('Please fill in the form');
    }

    search() {
        this.setAttribute('status', 'searching');
        this.reset();

        return this._requestor.request(patientSearchBuilder(this._form.getValues()))
            .then(response => response.data)
            .then(data => {
                if (!data || data.length == 0) {
                    this._result.block();
                    return data;
                }

                this._result.setData(data);
                this.removeAttribute('status');
            });
    }
}

defineCustomElement(XPageSearch);
