import "../../app/widgets/style/x-panel.js";
import "../../app/widgets/style/x-label.js";

import "../../app/widgets/func/x-form.js";

import "../../app/widgets/io/x-io-bill.js";
import "../../app/widgets/io/x-io-boolean.js";
import "../../app/widgets/io/x-io-numeric.js";
import "../../app/widgets/io/x-io-string.js";
import "../../app/widgets/io/x-io-text.js";

import "../../app/widgets/style/x-button.js";
import { createElementWithObject } from "../../app/js/custom-element.js";
import XButton from "../../app/widgets/style/x-button.js";

document.querySelectorAll("div#buttons").forEach((div) =>
  div.append(
    createElementWithObject(XButton, { action: XButton.Edit }, [], (el) =>
      el.addEventListener("click", () =>
        div
          .querySelectorAll("[x-io]")
          .forEach((xio) => xio.setAttribute("input", "input"))
      )
    ),
    createElementWithObject(XButton, { action: XButton.Search }, [], (el) =>
      el.addEventListener("click", () =>
        div
          .querySelectorAll("[x-io]")
          .forEach((xio) => xio.removeAttribute("input"))
      )
    ),

    createElementWithObject(XButton, { action: XButton.Save }, [], (el) =>
      el.addEventListener("click", () =>
        console.info(div.querySelector("x-form").getValues())
      )
    )
  )
);
