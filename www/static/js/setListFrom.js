function setListFrom(origin, target, category) {
  let val = document.querySelector(`[name=${origin}]`).value;
  if (!cryptomedic.serverSettings || !cryptomedic.serverSettings.associations) {
    return;
  }

  let list = [];
  if (cryptomedic.serverSettings.associations[`${category}.${val}`]) {
    list = list.concat(cryptomedic.serverSettings.associations[`${category}.${val}`]);
  }
  list = list.concat(cryptomedic.serverSettings.associations[`${category}.other`]);

  let current = document.querySelector(`[name=${target}]`).value;
  if (current == null) {

  } else {
    if (list.indexOf(current) < 0) {
      list = [current].concat(list);
    }    
  }
  document.querySelectorAll(`[name=${target}]`).forEach(el => {
    el.setAttribute('list', JSON.stringify(list));
  });
}
