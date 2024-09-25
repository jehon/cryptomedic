/**
 * @param {string|HTMLElement|*} form as the basis
 * @param {*} prototype as the Class basis for the returned element
 * @returns {object} with the data
 */
export function formGetContent(form, prototype = {}) {
  // const log = (...args) => console.log(...args);
  const log = (..._args) => {};

  let data = new prototype.constructor();
  Object.assign(data, prototype);

  // form can be:
  //  - css selector
  //  - NodeList
  //  - HTMLElement

  let formElement = form;
  if (typeof form == "string") {
    // CSS Selector -> HTMLElement
    formElement = document.querySelector(form);
  }

  let boundaries = [];

  let elementsList = formElement;
  if (formElement instanceof HTMLElement) {
    // HTMLElement -> NodeList
    elementsList = formElement.querySelectorAll("[name]");
    boundaries = Array.from(formElement.querySelectorAll("[form-boundary]"));
    log("Boundaries: ", boundaries, formElement);
  }

  nextElement: for (let i of elementsList) {
    // Skip empty names
    let name = i.getAttribute("name");
    if (!name) {
      log("no name: ", i);
      continue;
    }

    // Skip disabled elements
    if (i.disabled) {
      log("disabled: ", name);
      continue;
    }

    for (const f of boundaries) {
      if (f.contains(i)) {
        log(`outside boundaries of ${f.id}:`, name);
        continue nextElement;
      }
    }

    // Only take the selected radio
    if (i.matches("[type=radio") && !i.matches(":checked")) {
      log("unchecked radio: ", name, i);
      continue;
    }

    let value = i.value;
    if (value === undefined) {
      continue;
    }

    // Skip empty values
    if (value === "" || value == null) {
      log("no value: ", name, value, typeof value);
      delete data[name];
      continue;
    }

    // Treat some special cases
    if (i.type) {
      switch (i.type) {
        case "number":
          value = Number.parseInt(value);
          break;
        /* istanbul ignore next: impossible to fill in a input[type=file] element - see MSDN */
        case "file":
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
      log("null value: ", name);
      delete data[name];
    } else {
      data[name] = value;
      log("ok: ", name, value);
    }
  }
  return data;
}
