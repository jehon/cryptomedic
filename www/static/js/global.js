/**
 * Add autogrow capacity to textarea
 * @param {HTMLTextAreaElement} element where onkeyup is set
 */

// TODO: ,@typescript-eslint/no-unused-vars

// eslint-disable-next-line no-unused-vars
function textareaAdjust(element) {
  // @See templates-t.php

  // const lines = element.value.split("\n").length;
  // element.setAttribute("rows", lines);

  element.style.height = 0;
  element.style.height = "calc(" + element.scrollHeight + "px + 2em)";
}
