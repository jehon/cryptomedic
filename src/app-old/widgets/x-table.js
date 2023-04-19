import {
  defineCustomElement,
  createElementWithObject,
  createElementWithTag,
  enrichObject
} from "../js/custom-element.js";
import XOverlay from "./func/x-overlay.js";
import XPanel from "./style/x-panel.js";
import XIoBoolean from "./io/x-io-boolean.js";
import { getFloatFrom } from "../js/number-utils.js";

//
// Idea to reverse it (statistical report): https://stackoverflow.com/a/44092580/1954789
// Style by region name: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas
//

/**
 * @typedef {string|function(object, number, object):(string|HTMLElement)} BodyDetailDescription - function is (dataSet, index of data in datas, context)
 * @typedef {null|string|function([string], object):(string|HTMLElement)} HeadFootDetailDescription - function is (col, context)
 */

const HEADER = "header";
const FOOTER = "footer";
const BODY = "body";

/**
 *
 * Attributes: horizontal
 *
 *  > set: a set of data ([hi, hi], [i, i, i], [fi, fi] )
 *  - detail: a cross et ([ h1 ], [ i1, j1, k1, l1 ], [ f1 ])
 *
 * Vertical (default)
 *      line = details
 *      cols = sets
 *
 * +-----+
 * │head │
 * +-----+
 * │ijllm│
 * │i   m│
 * │i v m│
 * │i   m│
 * │ijklm│
 * +-----+
 * │foot │
 * +-----+
 *
 * Horizontal
 *     line = sets
 *     cols = details
 *
 * +-+-----+-+
 * |h|iiiii|f|
 * |e|j   j|o|
 * |a|k > k|o|
 * |d|l   l|t|
 * |d|mmmmm|t|
 * +-+-----+-+
 *
 * TODO: addBefore(), addAfter() => first/last column or head/foot ?
 */
export default class XTable extends HTMLElement {
  static MACROS = {
    sum: (col) => col.reduce((prev, val) => prev + getFloatFrom(val), 0),
    count: (col) => col.reduce((prev, val) => prev + (val ? 1 : 0), 0),
    countBoolean: (col) =>
      col.reduce((prev, el) => prev + (el.value ? 1 : 0), 0),
    boolean: (key) => (val) =>
      createElementWithObject(XIoBoolean, { value: val[key] })
  };

  /** @type {HTMLElement} */
  _element;

  /** @type {XOverlay} */
  _overlay;

  /**
   * @type {object} to describe data/body
   * @property {BodyDetailDescription} body - to generate row in each columns
   * @property {Array<HeadFootDetailDescription>} headers - to generate thead data
   * @property {Array<HeadFootDetailDescription>} footers - to generate tfoot data
   */
  _details;

  /**
   * @type {object} the config of the table
   * @property {object} headers to define headers
   * @property {object} footers to define footers
   */
  _config;

  /** @type {function(Element, number): void} callback to modify the element */
  _setsCallback;

  constructor() {
    super();

    this._details = [];
    this._config = {
      headers: {
        n: 0
      },
      footers: {
        n: 0
      }
    };

    this._setsCallback = () => {};

    // this.attachShadow({ mode: 'open' });

    this.innerHTML = "";
    this.append(
      // createElementWithTag('css-inherit'),
      // getPanelStyles(this, true),
      (this._overlay = createElementWithObject(XOverlay, {}, [
        createElementWithObject(XPanel, { slot: "overlay" }, [
          (this._overlayMsg = createElementWithTag("div"))
        ]),
        createElementWithTag(
          "div",
          {
            style: {
              width: "100%",
              overflowX: "auto"
            }
          },
          [
            (this._element = createElementWithTag(
              "table",
              {
                class: "table table-hover table-bordered tablesorter",
                style: {
                  width: "100%"
                }
              },
              []
            ))
          ]
        )
      ]))
    );
    this.block();
  }

  clear() {
    this._element.innerHTML = "";
  }

  block(msg = "No result found") {
    this._overlay.block();
    this._overlayMsg.innerHTML = msg;
    this.setAttribute("empty", "empty");
    this.setAttribute("count", "0");
  }

  /**
   * Set attributes on the top table element
   *
   * @param {object} attributes to be set
   * @returns {XTable} for chaining
   */
  enrichTable(attributes = {}) {
    enrichObject(this._element, attributes);
    return this;
  }

  /**
   * Change layout to horizontal layout
   *   (same as setting the attribute)
   *
   * @returns {XTable} for chaining
   */
  horizontal() {
    this.setAttribute("horizontal", "horizontal");
    return this;
  }

  /**
   * Set the number of headers
   *
   * @param {number} n - the number of * to add
   * @returns {XTable} for chaining
   */
  addHeaders(n) {
    this._config.headers = { n };
    return this;
  }

  /**
   * Set the number of footers
   *
   * @param {number} n - the number of * to add
   * @returns {XTable} for chaining
   */
  addFooters(n) {
    this._config.footers = { n };
    return this;
  }

  /**
   *
   * @param {BodyDetailDescription} fieldData to be put in cells
   * @param {object} config to configure the line
   * @param {Array<HeadFootDetailDescription>} [config.headers] to be put in headers (in reverse order)
   * @param {Array<HeadFootDetailDescription>} [config.footers] to be put in footers
   * @returns {XTable} for chaining
   */
  addDetail(fieldData, config = null) {
    this._details.push({
      body: fieldData,
      ...Object.assign(
        {
          headers: [],
          footers: [],
          label: false
        },
        config ?? {}
      )
    });
    return this;
  }

  /**
   * Format the whole set by callback
   *
   * @param {function(Element, object): void} callback to modify the element
   * @returns {XTable} for chaining
   */
  addSetFormatting(callback = (_el, _data) => {}) {
    this._setsCallback = callback;
    return this;
  }

  /**
   * @param {Array<object>} data to be set in the table
   * @param {object} context as third parameter for everything
   * @returns {object} with all the data [set][zone][detail] (Horizontal layout)
   *        head   |    body     |  foot
   *  0:   h00 h01 | b00 b01 b02 | f00 f01  <= detail[0] => result[0]
   *  1:   h10 h11 | b10 b11 b12 | f10 f11
   */
  _buildData(data, context) {
    const results = [];

    for (let i = 0; i < this._details.length; i++) {
      const iResult = {};
      const iDetail = this._details[i];

      iResult[BODY] = data.map((d, j) =>
        iDetail.body instanceof Function
          ? iDetail.body(d, j, context)
          : d[iDetail.body] ?? ""
      );

      iResult[HEADER] = [
        ...new Array(
          this._config.headers.n - (iDetail.headers?.length ?? 0)
        ).fill(null),
        ...([...iDetail.headers]
          ?.reverse()
          .map((f) =>
            f instanceof Function ? f(iResult[BODY], context) : f
          ) ?? [])
      ];

      iResult[FOOTER] = [
        ...(iDetail.footers?.map((f) =>
          f instanceof Function ? f(iResult[BODY], context) : f
        ) ?? []),
        ...new Array(
          this._config.footers.n - (iDetail.footers?.length ?? 0)
        ).fill(null)
      ];

      // // TODO: what signature?
      // iResult.formatter = iDetail.callback;

      results.push(iResult);
    }

    /**
     * Dump Horizontal layout
     * [set][zone][detail]
     * +-+-----+-+
     * |h|iiiii|f|
     * |e|j   j|o|
     * |a|k > k|o|
     * |d|l   l|t|
     * |d|mmmmm|t|
     * +-+-----+-+
     *
     */

    // console.log(results, '\n---'
    //     + results.map(iRes => '\n'
    //         + iRes[HEADER].join(' | ')
    //         + ' || '
    //         + iRes[BODY].join(' | ')
    //         + ' || '
    //         + iRes[FOOTER].join(' | ')
    //     )
    //     + '\n---\n'
    // );

    return results;
  }

  /**
   * @param {Array<object>} data to be set in the table
   * @param {object} context as third parameter for everything
   * @returns {XTable} for chaining
   */
  setData(data, context) {
    this._overlay.free();
    this.removeAttribute("empty");
    this.setAttribute("count", "" + data?.length);

    const builtData = this._buildData(data, context);

    // empty rows and create them back emtpy
    this._element.innerHTML = "";

    if (this.hasAttribute("horizontal")) {
      /**
       * Horizontal layout
       *     line = sets
       *     cols = details
       *
       * +-+-----+-+
       * |h|iiiii|f|
       * |e|j   j|o|
       * |a|k > k|o|
       * |d|l   l|t|
       * |d|mmmmm|t|
       * +-+-----+-+
       */

      // console.log(results, '\n---'
      //     + results.map(iRes => '\n'
      //         + iRes[HEADER].join(' | ')
      //         + ' || '
      //         + iRes[BODY].join(' | ')
      //         + ' || '
      //         + iRes[FOOTER].join(' | ')
      //     )
      //     + '\n---\n'
      // );
      const block = createElementWithTag("tbody");
      this._element.append(block);

      for (let setNbr = 0; setNbr < builtData.length; setNbr++) {
        const bd = builtData[setNbr];
        const line = createElementWithTag("tr");
        block.append(line);
        line.append(
          ...bd[HEADER].map((b) =>
            createElementWithTag("th", { class: "header" }, b ?? "")
          )
        );
        line.append(
          ...bd[BODY].map((b) =>
            createElementWithTag("th", { class: "body" }, b ?? "")
          )
        );
        line.append(
          ...bd[FOOTER].map((b) =>
            createElementWithTag("th", { class: "footer" }, b ?? "")
          )
        );
      }
    } else {
      /**
       * Vertical layout
       *      line = details
       *      cols = sets
       *      l = line label
       *
       * +-+-----+
       * │ |head │
       * +-+-----+
       * │l|ijllm│
       * │l|i   m│
       * │l|i v m│
       * │l|i   m│
       * │l|ijklm│
       * +-+-----+
       * │ |foot │
       * +-+-----+
       */

      // Headers
      {
        const block = createElementWithTag("thead");
        this._element.append(block);
        for (let lineNbr = 0; lineNbr < this._config.headers.n; lineNbr++) {
          const line = createElementWithTag("tr");
          // This will reverse the order
          block.append(line);
          let lastEl = null;
          let lastSize = 1;
          for (let setNbr = 0; setNbr < builtData.length; setNbr++) {
            const txt = builtData[setNbr][HEADER][lineNbr];
            if (txt === undefined || txt === null) {
              if (lastEl == null) {
                console.error(this, "Not enough headers in first line");
                continue;
              }
              lastSize++;
              lastEl.setAttribute("colspan", "" + lastSize);
            } else {
              lastEl = createElementWithTag("th", { class: "header" }, txt);
              lastSize = 1;
              line.append(lastEl);
            }
          }
        }
      }

      const block = createElementWithTag("tbody");
      this._element.append(block);
      for (let lineNbr = 0; lineNbr < data.length; lineNbr++) {
        const line = createElementWithTag("tr");
        block.append(line);
        this._setsCallback(line, data[lineNbr]);
        for (let setNbr = 0; setNbr < builtData.length; setNbr++) {
          line.append(
            createElementWithTag("td", {}, builtData[setNbr][BODY][lineNbr])
          );
        }
      }

      // Footers
      {
        const block = createElementWithTag("tfoot");
        this._element.append(block);
        for (let lineNbr = 0; lineNbr < this._config.footers.n; lineNbr++) {
          const line = createElementWithTag("tr");
          block.insertAdjacentElement("beforeend", line);
          let lastEl = null;
          let lastSize = 1;
          for (let setNbr = 0; setNbr < builtData.length; setNbr++) {
            const txt = builtData[setNbr][FOOTER][lineNbr];
            if (txt === undefined || txt === null) {
              if (lastEl == null) {
                console.error(this, "Not enough footers in first line");
                continue;
              }
              lastSize++;
              lastEl.setAttribute("colspan", "" + lastSize);
            } else {
              lastEl = createElementWithTag("th", { class: "header" }, txt);
              lastSize = 1;
              line.append(lastEl);
            }
          }
        }
      }
    }

    return this;
  }

  /**
   * To ease writing it
   */
  end() {}

  /**
   *
   * @param {HTMLElement} region of the region
   * @param {number} n - the number of * to add
   * @param {object} attributes to be set
   * @param {function(Element, number): void} callback to modify the element
   * @returns {XTable} for chaining
   */
  _addSetInRegion(region, n, attributes, callback) {
    // TODO: rotate
    for (let i = 0; i < n; i++) {
      region.append(
        createElementWithTag("tr", attributes, [], (el) => callback(el, i))
      );
    }
    return this;
  }

  /**
   *
   * @param {HTMLElement} region to be filled in
   * @param {Array<function(number):string|null>} values to be put in cells (number = row number)
   * @param {string} tag name
   * @returns {Array<string>} of calculated values
   */
  _addDetailToSetsInRegion(region, values, tag) {
    const childrenList = Array.from(region.children);
    if (!childrenList || childrenList.length < values.length) {
      console.error("Too much data: ", childrenList, values);
    }

    let res = [];

    for (let i = 0; i < childrenList.length; i++) {
      let val = values[i](i);
      const rowElement = childrenList[i];
      if (val == null) {
        // null header = extend precedent one

        const prev = /** @type {HTMLElement} */ (rowElement.lastChild);
        const colspan = prev.hasAttribute("colspan")
          ? Number.parseInt(prev.getAttribute("colspan"))
          : 1;
        prev.setAttribute("colspan", "" + (colspan + 1));
      } else {
        rowElement.append(createElementWithTag(tag, {}, val));
      }
      res.push(val);
    }

    return res;
  }
}

defineCustomElement(XTable);
