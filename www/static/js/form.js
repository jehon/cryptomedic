
function formGetContent(form, prototype = {}) {
  let data = new prototype.constructor();
  Object.assign(data, prototype);

  let formElement = form;
  if (!(form instanceof HTMLElement)) {
    formElement = document.querySelector(form);
  }

  // for(let i of document.querySelector(form).querySelectorAll("input:not([type=radio]), select, input[type=radio]:checked")) {
  for(let i of formElement.querySelectorAll("[name]")) {
    if (i.disabled) {
      break;
    }

    // Only take the selected radio
    if (i.matches("[type=radio") && !i.matches("[checked]")) {
      continue;
    }

    let name = i.getAttribute('name');

    let value = i.value;
    if (typeof(i.getValue) == 'function') {
      value = i.getValue();
    }

    if (typeof(value) == 'object') {
      Object.assign(data, value);
      continue;
    }

    // Skip empty values
    if (value === "") {
      continue;
    }

    data[name] = value;
    if (i.type) {
      switch(i.type) {
        case "number":
          data[name] = Number.parseInt(value);
          break;
        case "file":
          // http://blog.teamtreehouse.com/uploading-files-ajax
          // We can pass the "File" object to FormData, it will handle it for us....
          data[name] = i.files[0];
          break;
      }
    }
  }
  return data;
}
