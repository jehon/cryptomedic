import {
  createElementWithObject,
  createElementWithTag
} from "./custom-element.js";
import XForm from "../widgets/func/x-form.js";
import XButton from "../widgets/style/x-button.js";
import XButtons from "../widgets/func/x-buttons.js";
import XOverlay from "../widgets/func/x-overlay.js";
import XPanel from "../widgets/style/x-panel.js";

// TODO: x-overlay should not have a 'inline' content, only a 'popup' content
/**
 * @typedef {import('../v2/widgets/func/x-form.js').FormValidator} FormValidator
 */

class OverlayBuilder {
  /** @type {XOverlay} */
  xOverlay;

  /** @type {XForm}  */
  xForm;

  /** @type {HTMLDivElement}  */
  xHeader;

  /** @type {Promise} */
  promise;

  /** @type {function(*): void} */
  resolve;

  /** @type {function(*): void} */
  reject;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });

    this.xOverlay = createElementWithObject(
      XOverlay,
      { global: true },
      [
        createElementWithObject(XPanel, { slot: "overlay" }, [
          createElementWithTag(
            "div",
            {
              // The box
              style: {
                padding: "40px",
                backgroundColor: "white",
                color: "black",
                border: "solid gray 1px",
                boxShadow: "10px 5px 5px black"
              }
            },
            [
              (this.xHeader = /** @type {HTMLDivElement} */ (
                createElementWithTag("div", {
                  style: {
                    paddingBottom: "20px"
                  }
                })
              )),
              (this.xForm = createElementWithObject(XForm, {}, [
                (this.xFormContent = createElementWithTag("div")),
                (this.xFormButtons = createElementWithObject(XButtons, {
                  slot: "buttons"
                }))
              ]))
            ]
          )
        ])
      ],
      (el) =>
        el.addEventListener(XOverlay.ActionFree, (evt) =>
          this.terminate(/** @type {CustomEvent} */ (evt))
        )
    );
    this.xOverlay.block();
  }

  /**
   * @param {string} cls to be applied
   * @returns {OverlayBuilder} for chaining
   */
  withClass(cls) {
    this.xOverlay.classList.add(cls);
    return this;
  }

  /**
   * @param {Array<HTMLElement|string>} divs to be added
   * @returns {OverlayBuilder} for chaining
   */
  withTexts(divs) {
    this.xHeader.append(
      ...divs.map((d) =>
        typeof d == "string" ? createElementWithTag("div", {}, d) : d
      )
    );
    return this;
  }

  /**
   * @param {Array<HTMLElement>} data to be putted in the form
   * @param {FormValidator} [validator] to validate the input
   * @returns {OverlayBuilder} for chaining
   */
  withForm(data, validator = null) {
    this.xForm.append(...data);
    if (validator) {
      this.xForm.withCustomValidator(validator);
    }
    return this;
  }

  /**
   * @param {Array<XButton|string>} buttons to be putted in the form
   * @returns {OverlayBuilder} for chaining
   */
  withButtons(buttons) {
    this.xFormButtons.append(
      ...buttons.map((b) =>
        typeof b == "string"
          ? createElementWithObject(XButton, { action: b })
          : b
      )
    );
    return this;
  }

  /**
   *
   * @param {CustomEvent} [event] passed by the XOverlay
   */
  terminate(event) {
    // Remove from the DOM
    this.xOverlay.remove();
    if (!event) {
      return;
    }
    if (event.detail.action == XForm.ActionSubmit) {
      this.resolve({
        action: event.detail.action,
        data: event.detail.data
      });
    } else {
      this.reject(event);
    }
  }

  go() {
    // Insert this into the DOM
    document
      .querySelector("body")
      .insertAdjacentElement("afterbegin", this.xOverlay);
    return this.promise;
  }
}

/**
 * @returns {OverlayBuilder} to build up an overlay
 */
export function createOverlay() {
  return new OverlayBuilder();
}

/**
 * @param {string|HTMLElement|Array<string|HTMLElement>} text to be inserted as info
 * @returns {Promise} to follow up
 */
export function overlayAcknowledge(text) {
  return createOverlay()
    .withClass("acknowledge")
    .withTexts(Array.isArray(text) ? text : [text])
    .withButtons([
      createElementWithObject(XButton, { action: XButton.Default })
    ])
    .go();
}

/**
 * @param {string} [message] to be shown
 * @returns {function(void): void} to stop the waiting
 */
export function overlayWaiting(message = "") {
  const ov = createOverlay()
    .withClass("waiting")
    .withTexts([
      // TODO: could be more beautifull...
      createElementWithTag("img", { src: "/static/img/waiting.gif" }),
      createElementWithTag("span", { id: "versal" }, "Loading "),
      createElementWithTag("div", {}, message)
    ]);
  ov.go();

  return () => ov.terminate();
}
