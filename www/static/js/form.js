
function formGetContent(form, prototype = {}) {
  let data = new prototype.constructor();
  Object.assign(data, prototype);

  // form can be:
  //  - css selector
  //  - NodeList
  //  - HTMLElement

  let formElement = form;
  if (typeof(form) == "string") {
    // CSS Selector -> HTMLElement
    formElement = document.querySelector(form);
  }

  let elementsList = formElement;
  if (formElement instanceof HTMLElement) {
    // HTMLElement -> NodeList
    elementsList = formElement.querySelectorAll("[name]");
  }

  for(let i of elementsList) {
    // Skip disabled elements
    if (i.disabled) {
      continue;
    }

    if (i.offsetHeight + i.offsetWidth < 1) {
      continue;
    }

    // Skip empty names
    let name = i.getAttribute('name');
    if (!name) {
      continue;
    }

    // Only take the selected radio
    if (i.matches("[type=radio") && !i.matches("[checked]")) {
      continue;
    }

    let value = i.value;

    // Skip empty values
    if (value === "" || value == null) {
      delete(data[name]);
      continue;
    }

    // Treat some special cases
    if (i.type) {
      switch(i.type) {
        case "number":
          value = Number.parseInt(value);
          break;
        /* istanbul ignore next: impossible to fill in a input[type=file] element - see MSDN */
        case "file":
          // http://blog.teamtreehouse.com/uploading-files-ajax
          // We can pass the "File" object to FormData, it will handle it for us....
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
      delete(data[name]);
    } else {
      data[name] = value;
    }
  }
  return data;
}

function formFillIn(form, object) {
    let formElement = form;
    if (!(form instanceof HTMLElement)) {
        formElement = document.querySelector(form);
    }

    Object.keys(object).forEach(k => {
        formElement.querySelectorAll(`[name='${k}']`).forEach(el => el.setAttribute("value", (object[k] ? object[k] : "")));
    });

    formEvaluateFunctions(formElement, object);
}

function formEvaluateFunctions(formElement, object) {
    formElement.querySelectorAll(`[function]`).forEach(el => {
        fn = el.getAttribute('function');
        if (fn in object) {
            el.innerHTML = object[fn]()
        }
    });
}

function formSwitch(form, tag, mode) {
    let formElement = form;
    if (!(form instanceof HTMLElement)) {
        formElement = document.querySelector(form);
    }

    formElement.querySelectorAll(`[${tag}]`).forEach(el => {
        if (mode == "read") {
            el.removeAttribute('edit');
        } else {
            el.setAttribute('edit', tag);
        }
    })
}
