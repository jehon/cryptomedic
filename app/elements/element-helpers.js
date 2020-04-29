
function htmlToElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
}

export function insertInSlotDefault(element, content) {
    element.shadowRoot.querySelector('slot').replaceWith(htmlToElement(`<span slot>${content}</span>`));
}

export function insertInSlot(element, name, content) {
    element.shadowRoot.querySelector(`slot[name=${name}]`).replaceWith(htmlToElement(`<span slot-${name}>${content}</span>`));
}
