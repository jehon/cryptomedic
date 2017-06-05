
function formGetContent(form, prototype = {}) {
  let data = new prototype.constructor();
  Object.assign(data, prototype);

  // for(let i of document.querySelector(form).querySelectorAll("input:not([type=radio]), select, input[type=radio]:checked")) {
  for(let i of document.querySelector(form).querySelectorAll("[name]")) {
    // Skip hidden input
    if (i.clientHeight == 0) {
      continue;
    }

    if (i.matches("[type=radio") && !i.matches("[checked]")) {
      continue;
    }

    if (typeof(i.value) == "undefined") {
      i.value = null;
      continue;
    }

    let name = i.getAttribute('name');
    let value = i.value;

    if (typeof(value) == 'object') {
      Object.assign(data, value);
      continue;
    }

    if (value === "") {
      value = null;
      continue;
    }

    switch(i.type) {
      case "number":
        data[name] = Number.parseInt(value);
        break;
      case "file":
        // http://blog.teamtreehouse.com/uploading-files-ajax
        // We can pass the "File" object to FormData, it will handle it for us....
        // var file = ; //document.getElementById("fileForUpload").files[0];
        data[name] = i.files[0];
        break;
      default:
        data[name] = value;
        break;
    }
  }
  return data;
}
