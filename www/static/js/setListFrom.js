function setListFrom(origin, target, category) {
    if (!cryptomedic.serverSettings || !cryptomedic.serverSettings.associations) {
        return;
    }
    const val = document.querySelector(`[name=${origin}]`).value;
    let list = [];
    if (cryptomedic.serverSettings.associations[`${category}.${val}`]) {
        list = list.concat(cryptomedic.serverSettings.associations[`${category}.${val}`]);
    }
    list = list.concat(cryptomedic.serverSettings.associations[`${category}.other`]);

    if (document.querySelector(`[name=${target}]`).value) {
        // If the current is already selected, add it to the list to keep it...
        if (list.indexOf(current) < 0) {
            list = [current].concat(list);
        }
    }

    document.querySelectorAll(`[name=${target}]`).forEach(el => {
        el.setAttribute('list', JSON.stringify(list));
    });
}