
function getFormContent(form, prototype = {}) {
  let updatedData = new prototype.constructor();
  Object.assign(updatedData, prototype);
  for(let i of document.querySelector(form).querySelectorAll("input:not(.jh-select), select, jh-select")) {
    // Skip hidden input
    if (i.clientHeight == 0) {
      continue;
    }

    if (typeof(i.value) == "undefined") {
      i.value = null;
      continue;
    }

    let name = i.getAttribute('name');
    let value = i.value;

    if (typeof(value) == 'object') {
      Object.assign(updatedData, value);
      continue;
    }

    if (value === "") {
      value = null;
      continue;
    }

    switch(i.type) {
      case "number":
        updatedData[name] = Number.parseInt(value);
        break;
      case "file":
        // http://blog.teamtreehouse.com/uploading-files-ajax
        // We can pass the "File" object to FormData, it will handle it for us....
        // var file = ; //document.getElementById("fileForUpload").files[0];
        updatedData[name] = i.files[0];
        break;
      default:
        updatedData[name] = value;
        break;
    }
  }
  return updatedData;
}
