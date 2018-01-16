function setListFrom(origin, target, category) {
    if (!cryptomedic.serverSettings || !cryptomedic.serverSettings.associations) {
        return;
    }
    if (!document.querySelector(`[name=${origin}]`)) {
        console.error("setListFrom: Origin not defined...", origin);
        return ;
    }
    if (!document.querySelector(`[name=${target}]`)) {
        console.error("setListFrom: Target not defined...", target);
        return ;
    }
    const val = document.querySelector(`[name=${origin}]`).value;
    let list = [];
    if (cryptomedic.serverSettings.associations[`${category}.${val}`]) {
        list = list.concat(cryptomedic.serverSettings.associations[`${category}.${val}`]);
    }
    list = list.concat(cryptomedic.serverSettings.associations[`${category}.other`]);

    const current = document.querySelector(`[name=${target}]`).value;
    if (current) {
        // If the current is already selected, add it to the list to keep it...
        if (list.indexOf(current) < 0) {
            list = [current].concat(list);
        }
    }

    document.querySelectorAll(`[name=${target}]`).forEach(el => {
        el.setAttribute('list', JSON.stringify(list));
    });
}