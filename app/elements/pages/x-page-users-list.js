
import { actions } from '../../config.js';
import { createElementWithObject, defineCustomElement } from '../../js/custom-element.js';
import { getRoute, routes } from '../../js/router.js';
import XRequestor, { usersListBuilder } from '../funcs/x-requestor.js';
import XTable from '../funcs/x-table.js';
import XButton from '../render/x-button.js';
import XButtons from '../render/x-buttons.js';
import XPanel from '../render/x-panel.js';
import XReadBoolean from '../x-read-boolean.js';

/**
 * attributes:
 * - uid: the id of the user where to change the password
 */
export default class XPageUsersList extends HTMLElement {
    /** @type {XRequestor} */
    _requestor

    /** @type {HTMLElement} */
    _listing

    constructor() {
        super();
        this.innerHTML = '';

        this.append(
            this._requestor = createElementWithObject(XRequestor, {}, [
                createElementWithObject(XPanel, { style: { justifyContent: 'flex-end', flexDirection: 'row' } }, [
                    createElementWithObject(XButton, { id: 'add', actions: actions.move, toRoute: routes.user_add }, 'Add user')
                ]),
                this._result = createElementWithObject(XTable, { full: true }, [],
                    (/** @type {XTable} */ el) =>
                        el
                            // .enrichTable({ class: 'table table-hover table-bordered tablesorter' })
                            .addHeaders(1)
                            .addColumn('id', ['Id'])
                            .addColumn('username', ['Username'])
                            .addColumn('name', ['Full Name'])
                            .addColumn('codage', ['Codage'])
                            .addColumn('email', ['Email'])
                            .addColumn((data) => createElementWithObject(XReadBoolean, { value: data.inExaminerList }), ['In Examiner List'])
                            .addColumn((data) => createElementWithObject(XReadBoolean, { value: data.hasPassword }), ['Has Password'])
                            .addColumn('notes', ['Notes'])
                            .addColumn((data) =>
                                createElementWithObject(XButtons, {}, [
                                    createElementWithObject(XButton, { id: 'edit', action: actions.move, toRoute: getRoute(routes.user_edit, { uid: data.id }) }, 'Edit'),
                                    createElementWithObject(XButton, { id: 'pwd', action: actions.move, toRoute: getRoute(routes.user_password, { uid: data.id }) }, 'Change Password'),
                                ]), ['Actions'])
                )
            ])
        );
    }

    connectedCallback() {
        this._requestor.request(usersListBuilder())
            .then(response => response.data)
            .then((data) => this._result.setData(data));
    }
}

defineCustomElement(XPageUsersList);
