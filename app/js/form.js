
export function formGetContent(form, prototype = {}) {
    // const log = (...args) => console.log(...args);
    const log = () => { };

    let data = new prototype.constructor();
    Object.assign(data, prototype);

    // form can be:
    //  - css selector
    //  - NodeList
    //  - HTMLElement

    let formElement = form;
    if (typeof (form) == 'string') {
        // CSS Selector -> HTMLElement
        formElement = document.querySelector(form);
    }

    let elementsList = formElement;
    if (formElement instanceof HTMLElement) {
        // HTMLElement -> NodeList
        elementsList = formElement.querySelectorAll('[name]');
    }

    for (let i of elementsList) {
        // Skip empty names
        let name = i.getAttribute('name');
        if (!name) {
            log('no name: ', i);
            continue;
        }

        // Skip disabled elements
        if (i.disabled) {
            log('disabled: ', name);
            continue;
        }

        if (i.offsetHeight + i.offsetWidth < 1) {
            log('too small: ', name, i.offsetHeight, i.offsetWidth);
            continue;
        }

        // Only take the selected radio
        if (i.matches('[type=radio') && !i.matches(':checked')) {
            log('unchecked radio: ', name, i);
            continue;
        }

        let value = i.value;

        // Skip empty values
        if (value === '' || value == null) {
            log('no value: ', name, value, typeof (value));
            delete (data[name]);
            continue;
        }

        // Treat some special cases
        if (i.type) {
            switch (i.type) {
                case 'number':
                    value = Number.parseInt(value);
                    break;
                    /* istanbul ignore next: impossible to fill in a input[type=file] element - see MSDN */
                case 'file':
                    // http://blog.teamtreehouse.com/uploading-files-ajax
                    // We can pass the 'File' object to FormData, it will handle it for us....
                    if (i.data) {
                        value = i.data.data;
                    } else {
                        value = null;
                    }
                    break;
            }
        }

        // Assign it
        if (value == null) {
            log('null value: ', name);
            delete (data[name]);
        } else {
            data[name] = value;
            log('ok: ', name, value);
        }
    }
    return data;
}

export function formFillIn(form, object) {
    let formElement = form;
    if (!(form instanceof HTMLElement)) {
        formElement = document.querySelector(form);
    }

    Object.keys(object).forEach(k => {
        formElement.querySelectorAll(`[name='${k}']`).forEach(el => el.setAttribute('value', (object[k] ? object[k] : '')));
    });

    formEvaluateFunctions(formElement, object);
}

export function formEvaluateFunctions(formElement, object) {
    formElement.querySelectorAll('[function]').forEach(el => {
        const fn = el.getAttribute('function');
        if (fn in object) {
            el.innerHTML = object[fn]();
        }
    });
}

export function formSwitch(form, tag, mode) {
    let formElement = form;
    if (!(form instanceof HTMLElement)) {
        formElement = document.querySelector(form);
    }

    formElement.querySelectorAll(`[${tag}]`).forEach(el => {
        if (mode == 'read') {
            el.removeAttribute('edit');
        } else {
            el.setAttribute('edit', tag);
        }
    });
}
