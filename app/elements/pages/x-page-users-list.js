
import { actions } from '../../config.js';
import { createElementWithObject, defineCustomElement } from '../../js/custom-element.js';
import { getRoute, routes } from '../../js/router.js';
import TableBuilder from '../../js/table-builder.js';
import XRequestor, { usersListBuilder } from '../funcs/x-requestor.js';
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
                ])
            ])
        );
    }

    connectedCallback() {
        this._requestor.request(usersListBuilder())
            .then(response => response.data)
            .then((data) => {
                this._requestor.querySelector('table')?.remove();
                this._requestor.append(
                    new TableBuilder()
                        .enrichTable({ class: 'table table-hover table-bordered tablesorter' })
                        .addData(data)
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
                                createElementWithObject(XButton, { action: actions.move, toRoute: getRoute(routes.user_edit, { uid: data.id }) }, 'Edit'),
                                createElementWithObject(XButton, { action: actions.move, toRoute: getRoute(routes.user_password, { uid: data.id }) }, 'Change Password'),
                            ]), ['Actions'])
                        .render()
                );
            });
    }
}

defineCustomElement(XPageUsersList);
