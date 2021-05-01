
import { actions } from '../../config.js';
import { createElementWithObject, createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import { getRouteToFolderPatient, setRoute } from '../../js/router.js';
import XForm from '../funcs/x-form.js';
import XRequestor, { checkReferenceBuilder, createReferenceBuilder } from '../funcs/x-requestor.js';
import XButton from '../render/x-button.js';
import XButtons from '../render/x-buttons.js';
import XGroupPanel from '../render/x-group-panel.js';
import XLabel from '../render/x-label.js';
import XPanel from '../render/x-panel.js';

/**
 * Slot: none
 */
export default class XPatientByReference extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = '';
        this.append(
            createElementWithTag('css-inherit'),
            createElementWithTag('style', {}, `
    x-patient-by-reference #creator {
        display: none;
    }

    x-patient-by-reference[status=creation-proposed] #creator {
        display: flex;
    }
            `),
            createElementWithObject(XGroupPanel, { title: 'Search by reference' }, [
                this._requestor = createElementWithObject(XRequestor, {}, [
                    this._form = createElementWithObject(XForm, {},
                        [
                            createElementWithTag('div', { white: true }, 'Please enter the reference for the patient you want to see'),
                            createElementWithObject(XLabel, { label: 'Entry Year' },
                                [
                                    createElementWithTag('input', {
                                        name: 'entryyear',
                                        type: 'number',
                                        required: true,
                                        value: (new Date()).getFullYear()
                                    })
                                ],
                                el => el.addEventListener('change', () => this.reset())
                            ),
                            createElementWithObject(XLabel, { label: 'Entry Order' },
                                [
                                    createElementWithTag('input', {
                                        name: 'entryorder',
                                        type: 'number',
                                        required: true,
                                        autofocus: true
                                    })
                                ],
                                el => el.addEventListener('change', () => this.reset())
                            ),
                            createElementWithObject(XButtons, { slot: 'buttons' }, [
                                createElementWithObject(XButton, { action: actions.query }, 'Search reference'),
                                createElementWithObject(XButton, { action: actions.cancel }, 'Reset')
                            ])
                        ],
                        (el) => {
                            el.addEventListener('submit', () => this.search());
                            el.addEventListener('reset', () => this.reset());
                        }
                    ),
                    createElementWithTag('br'),
                    createElementWithObject(XPanel, { id: 'creator' }, [
                        createElementWithTag('div', {}, [
                            'The patient does not exist. Do you want to create it?',
                        ]),
                        createElementWithObject(XButton,
                            {
                                action: actions.commit,
                                id: 'create-reference',
                                style: 'min-width: 50%'

                            },
                            [
                                'Create the patient'
                            ],
                            (el) => el.addEventListener('click', () => this.createReference())
                        )
                    ])
                ])
            ])
        );
    }

    reset() {
        this.removeAttribute('status');
    }

    search() {
        const data = this._form.getValues();
        this.setAttribute('status', 'searching');

        return this._requestor.request(checkReferenceBuilder(data.entryyear, data.entryorder))
            .then(response => response.data)
            .then(data => {
                if (data.id) {
                    this.setAttribute('status', 'found');
                    setRoute(getRouteToFolderPatient(data.id));
                } else {
                    this.setAttribute('status', 'creation-proposed');
                }
            });
    }

    createReference() {
        const data = this._form.getValues();
        this.setAttribute('status', 'creation-requesting');

        return this._requestor.request(createReferenceBuilder(data.entryyear, data.entryorder))
            .then(response => response.data)
            .then(data => {
                this.setAttribute('status', 'creation-requested');
                setRoute(getRouteToFolderPatient(data.id, true));
            });
    }
}

defineCustomElement(XPatientByReference);

