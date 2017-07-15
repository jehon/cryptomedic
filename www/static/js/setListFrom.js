function setListFrom(origin, target, category) {
  console.log("SetListFrom", origin, target, category);
  let val = document.querySelector(`[name=${origin}]`).value;
  if (!cryptomedic.serverSettings || !cryptomedic.serverSettings.associations) {
    return;
  }

  let list = [];
  if (cryptomedic.serverSettings.associations[`${category}.${val}`]) {
    list = list.concat(cryptomedic.serverSettings.associations[`${category}.${val}`]);
  }
  list = list.concat(cryptomedic.serverSettings.associations[`${category}.other`]);

  if (list.indexOf(current) < 0) {
    list = [current].concat(list);
  }

  document.querySelectorAll(`[name=${target}]`).forEach(el => {
    console.log("Set list for ", val, " to ", list, " on ", el);
  });
}
