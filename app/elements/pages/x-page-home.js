
import '../components/x-patient-by-reference.js';

import { createElementsFromHTML, createElementWithObject, createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import { toAttributeCase } from '../../js/string-utils.js';
import { actions, API_VERSION, icons, messages } from '../../config.js';

import XPatientByReference from '../components/x-patient-by-reference.js';
import XGroupPanel from '../render/x-group-panel.js';
import XPanel from '../render/x-panel.js';
import XButtons from '../render/x-buttons.js';
import XButton from '../render/x-button.js';
import XRestricted from '../funcs/x-restricted.js';

import { getRouteToCreateReference } from '../../js/router.js';
import XMessage from '../render/x-message.js';

/**
 * @param {object} options to generate the XGroupPanel
 * @param {string} options.title - at top
 * @param {string?} options.id - for testing
 * @param {string?} options.versalIcon - to explain
 * @param {string} options.html - to explain
 * @param {string} options.toRoute - where to go when clicking on the button
 * @param {string?} options.buttonText - to explain
 * @param {string?} options.toLocation - location on click
 * @param {string?} options.restrictedBy - to restrict the element
 * @returns {HTMLElement} with the content
 */
function createMenu({ title, restrictedBy = '', id = toAttributeCase(title), versalIcon = '', html, toRoute = '', toLocation = '', buttonText = title }) {

    /** @type {HTMLElement} */
    let res = createElementWithObject(XGroupPanel,
        {
            id: id ? id : toAttributeCase(title),
            title
        },
        [
            versalIcon ? createElementWithTag('img', { slot: 'versal', src: versalIcon }) : null,
            ...createElementsFromHTML(`<div style="flex-grow: 1" white>${html}</div>`),
            createElementWithObject(XButtons, {}, [
                createElementWithObject(XButton,
                    {
                        action: actions.move,
                        'to-route': toRoute,
                        'to-location': toLocation
                    }
                    , buttonText)
            ])
        ]);
    if (restrictedBy) {
        res = createElementWithObject(XRestricted, { 'restricted-by': restrictedBy }, res);
    }

    return res;
}

/**
 *
 */
export default class XPageHome extends HTMLElement {
    constructor() {
        super();
        this.append(
            createElementWithTag('style', {}, `
    .grid {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-content: stretch;
    }

    @media screen and (min-width: 600px) {
        .grid > * {
            min-height: 200px;
        }
    }

    .grid > * {
        flex-basis: max(250px, calc(25% - 20px));
        flex-grow: 0;
        flex-shrink: 0;

        margin: 10px;
    }

    .grid x-group-panel > img[slot=versal] {
        width: 40px;
    }

    .grid > x-restricted > * {
        flex-grow: 1;
    }
`
            ),
            createElementWithObject(XMessage, { level: messages.info }, createElementsFromHTML(`<div>
Dear user,<br><br>

The menu is currently changing. Top button will dissapear progressively. They will be replaced by
links on this home page. This is done to ease usage of mobile.<br><br>

Thanks for your understanding.<br><br>

Jean
</div>`)),

            // createElementWithObject()
            createElementWithObject(XPanel, { full: true }, [
                ...createElementsFromHTML('<h1 id="page_home" class="text - center"><img src="/static/img/home.gif">Home</h1>'),

                createElementWithTag('div', { class: 'grid' }, [
                    createElementWithObject(XPatientByReference),

                    // @ts-ignore
                    createMenu({
                        title: 'Create a reference',
                        id: 'autogenerate-reference',
                        versalIcon: icons.patient,
                        html: 'Create a patient with an <b>autogenerated</b> reference. Auto-generated references start at 10.000. Reference year will be asked on next page.',
                        toRoute: getRouteToCreateReference()
                    }),

                    // @ts-ignore
                    createMenu({
                        title: 'Search',
                        restrictedBy: 'folder.read',
                        id: 'search_menu',
                        versalIcon: '/static/img/patientsSearch.gif',
                        html: 'Search a patient',
                        toRoute: '/search'
                    }),

                    // @ts-ignore
                    createMenu({
                        title: 'Consultations of the day',
                        restrictedBy: 'planning.execute',
                        id: 'report_consultations_menu',
                        versalIcon: '/static/img/consultOfDay.gif',
                        html: 'Have a list of the consultations of the day',
                        toRoute: '/reports/consultations'
                    }),

                    // @ts-ignore
                    createMenu({
                        title: 'Activity Report',
                        restrictedBy: 'reports.execute',
                        id: 'report_activity_menu',
                        versalIcon: '/static/img/reports.gif',
                        html: `
If you want to know your activity, choose this report.<br>
Options: the day, and optionnaly the examiner, the center and type of activity (workshop / consult / surgical / ...).
`,
                        toRoute: '/reports/activity'
                    }),

                    // @ts-ignore
                    createMenu({
                        title: 'Statistical Report',
                        restrictedBy: 'reports.execute',
                        id: 'report_statistical_menu',
                        versalIcon: '/static/img/reports.gif',
                        html: 'If you want to know the activity of the SARPV CDC on a period.',
                        toRoute: '/reports/statistical'
                    }),

                    // @ts-ignore
                    createMenu({
                        title: 'Surgical Report',
                        restrictedBy: 'reports.execute',
                        id: 'report_surgical_menu',
                        versalIcon: '/static/img/reports.gif',
                        html: 'Follow up of the surgical activity of the period.',
                        toRoute: '/reports/surgical'
                    }),

                    // @ts-ignore
                    createMenu({
                        title: 'Bug reporting',
                        versalIcon: '/static/img/bug.jpeg',
                        html: `
If you find a bug, please email to jeanhonlet@gmail.com.<br>
Thanks
                    `,
                        toLocation: 'mailto:jeanhonlet@gmail.com?subject=Cryptomedic%20bug:'
                    }),

                    // @ts-ignore
                    createMenu({
                        title: 'Prices',
                        restrictedBy: 'price.edit',
                        id: 'menu_prices',
                        versalIcon: '/static/img/prices.png',
                        html: 'Manage the various prices',
                        toRoute: '/prices'
                    }),

                    // @ts-ignore
                    createMenu({
                        title: 'Users management',
                        restrictedBy: 'users.manage',
                        id: 'menu_users',
                        versalIcon: '/static/img/users.png',
                        html: 'Manage the users of Cryptomedic.',
                        toRoute: '/users'
                    }),

                    // @ts-ignore
                    createMenu({
                        title: 'View matrix',
                        restrictedBy: 'admin.securityMatrix',
                        versalIcon: '/static/img/matrix.png',
                        html: 'List of rights',
                        toLocation: `/api/${API_VERSION}/admin/securityMatrix`
                    })
                ])
            ])
        );
    }
}

defineCustomElement(XPageHome);
