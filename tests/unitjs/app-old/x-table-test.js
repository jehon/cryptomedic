import XTable from "../../../legacy/app-old/v2/widgets/x-table.js";
import { createElementWithObject } from "../../../legacy/app-old/v2/js/custom-element.js";

import { fn } from "./athelpers.js";

// function d(element) {
//   // eslint-disable-line
//   const t = element.querySelector("table");
//   console.log(t); // eslint-disable-line
//   // var textToSaveAsBlob = new Blob(t.innerHTML, { type: 'text/plain' });
//   // console.log(textToSaveAsBlob.text());
// }

/**
 *
 * @param {HTMLTableRowElement} element to be checked
 * @param {[string]} data to be compared to
 * @param {string} ctx context
 */
function checkRow(element, data, ctx) {
  const children = element.children;
  expect(children.length)
    .withContext(`${ctx} should have ${data.length} columns`)
    .toEqual(data.length);
  for (const i in data) {
    expect(children[i].innerHTML).withContext(`${ctx}.${i}`).toEqual(data[i]);
  }
}

function checkRegion(element, data, ctx) {
  const children = element.children;
  expect(children.length)
    .withContext(`${ctx} should have ${data.length} rows`)
    .toEqual(data.length);
  for (const i in data) {
    checkRow(children[i], data[i], `${ctx}.${i}`);
  }
}

function checkTable(element, regions) {
  const table = element.querySelector("table");
  for (const i of ["thead", "tbody", "tfoot"]) {
    if (i in regions && regions[i]) {
      checkRegion(table.querySelector(i), regions[i], `${i}`);
    }
  }
}

//
// Notation: hxy : h x column <->, y row |↕ (excel-like)
//
describe(fn(import.meta.url), function () {
  describe("vertically", function () {
    it("should use constants", function () {
      const element = createElementWithObject(
        XTable,
        {},
        [],
        (/** @type {XTable} */ el) => {
          el.addHeaders(2)
            .addFooters(2)
            .addDetail("c0", {
              headers: ["hr1c0", "hr0c0"],
              footers: ["fr0c0", "fr1c0"]
            })
            .addDetail("c1", {
              headers: ["hr1c1", "hr0c1"],
              footers: ["fr0c1", "fr1c1"]
            });
        }
      );
      element.setData([
        { c0: "br0c0", c1: "br0c1" },
        { c0: "br1c0", c1: "br1c1" },
        { c0: "br2c0", c1: "br2c1" }
      ]);

      checkTable(element, {
        thead: [
          ["hr0c0", "hr0c1"],
          ["hr1c0", "hr1c1"]
        ],
        tbody: [
          ["br0c0", "br0c1"],
          ["br1c0", "br1c1"],
          ["br2c0", "br2c1"]
        ],
        tfoot: [
          ["fr0c0", "fr0c1"],
          ["fr1c0", "fr1c1"]
        ]
      });
    });

    it("should be called multiple times", function () {
      const element = createElementWithObject(
        XTable,
        {},
        [],
        (/** @type {XTable} */ el) => {
          el.addHeaders(2)
            .addFooters(2)
            .addDetail("c0", {
              headers: ["hr1c0", "hr0c0"],
              footers: ["fr0c0", "fr1c0"]
            })
            .addDetail("c1", {
              headers: ["hr1c1", "hr0c1"],
              footers: ["fr0c1", "fr1c1"]
            });
        }
      );
      element.setData([
        { c0: "br0c0", c1: "br0c1" },
        { c0: "br1c0", c1: "br1c1" }
      ]);
      element.setData([
        { c0: "br0c0", c1: "br0c1" },
        { c0: "br1c0", c1: "br1c1" }
      ]);

      checkTable(element, {
        thead: [
          ["hr0c0", "hr0c1"],
          ["hr1c0", "hr1c1"]
        ],
        tbody: [
          ["br0c0", "br0c1"],
          ["br1c0", "br1c1"]
        ],
        tfoot: [
          ["fr0c0", "fr0c1"],
          ["fr1c0", "fr1c1"]
        ]
      });
    });

    it("should use null", function () {
      const element = createElementWithObject(
        XTable,
        {},
        [],
        (/** @type {XTable} */ el) => {
          el.addHeaders(2)
            .addFooters(2)
            .addDetail("c0", {
              headers: ["hr1c0", "hr0c0"],
              footers: ["fr0c0", "fr1c0"]
            })
            .addDetail("c1", {
              headers: [null],
              footers: [null]
            })
            .addDetail("");
        }
      );
      element.setData([
        { c0: "br0c0", c1: "br0c1" },
        { c0: "br1c0", c1: "br1c1" }
      ]);

      // d(element);

      checkTable(element, {
        thead: [["hr0c0"], ["hr1c0"]],
        tbody: [
          ["br0c0", "br0c1", ""],
          ["br1c0", "br1c1", ""]
        ],
        tfoot: [["fr0c0"], ["fr1c0"]]
      });
    });

    it("should use functions based on data", function () {
      const element = createElementWithObject(
        XTable,
        {},
        [],
        (/** @type {XTable} */ el) => {
          el.addHeaders(2)
            .addFooters(2)
            // Indice is ok
            .addDetail((data, _) => data.c0, {
              headers: ["hr1c0", (_data) => "hr0c0"],
              footers: ["fr0c0", (_data) => "fr1c0"]
            })
            // Data is ok
            .addDetail((_ata, i) => `br${i}c1`, {
              headers: ["hr1c1", (data) => data.join("/")],
              footers: ["fr0c1", (data) => data.join("/")]
            });
        }
      );
      element.setData([
        { c0: "br0c0", c1: "br0c1" },
        { c0: "br1c0", c1: "br1c1" }
      ]);

      checkTable(element, {
        thead: [
          ["hr0c0", "br0c1/br1c1"],
          ["hr1c0", "hr1c1"]
        ],
        tbody: [
          ["br0c0", "br0c1"],
          ["br1c0", "br1c1"]
        ],
        tfoot: [
          ["fr0c0", "fr0c1"],
          ["fr1c0", "br0c1/br1c1"]
        ]
      });
    });

    it("should maintain context in functions", function () {
      const element = createElementWithObject(
        XTable,
        {},
        [],
        (/** @type {XTable} */ el) => {
          el.addHeaders(2)
            .addFooters(2)
            // Indice is ok
            .addDetail((data, _, context) => `${context}${data.c0}`, {
              headers: ["hr1c0", (_ata, context) => `${context}hr0c0`],
              footers: ["fr0c0", (_ata, context) => `${context}fr1c0`]
            })
            // Data is ok
            .addDetail((_ata, i, context) => `${context}br${i}c1`, {
              headers: ["hr1c1", (data, context) => context + data.join("/")],
              footers: ["fr0c1", (data, context) => context + data.join("/")]
            });
        }
      );
      element.setData(
        [
          { c0: "br0c0", c1: "br0c1" },
          { c0: "br1c0", c1: "br1c1" }
        ],
        ""
      );

      checkTable(element, {
        thead: [
          ["hr0c0", "br0c1/br1c1"],
          ["hr1c0", "hr1c1"]
        ],
        tbody: [
          ["br0c0", "br0c1"],
          ["br1c0", "br1c1"]
        ],
        tfoot: [
          ["fr0c0", "fr0c1"],
          ["fr1c0", "br0c1/br1c1"]
        ]
      });
    });
  });

  describe("horizontally", function () {
    it("should use constants", function () {
      const element = createElementWithObject(
        XTable,
        { horizontal: true },
        [],
        (/** @type {XTable} */ el) => {
          el.addHeaders(2)
            .addFooters(2)
            .addDetail("c0", {
              headers: ["hr1c0", "hr0c0"],
              footers: ["fr0c0", "fr1c0"]
            })
            .addDetail("c1", {
              headers: ["hr1c1", "hr0c1"],
              footers: ["fr0c1", "fr1c1"]
            });
        }
      );
      element.setData([
        { c0: "br0c0", c1: "br0c1" },
        { c0: "br1c0", c1: "br1c1" },
        { c0: "br2c0", c1: "br2c1" }
      ]);

      checkTable(element, {
        tbody: [
          ["hr0c0", "hr1c0", "br0c0", "br1c0", "br2c0", "fr0c0", "fr1c0"],
          ["hr0c1", "hr1c1", "br0c1", "br1c1", "br2c1", "fr0c1", "fr1c1"]
        ]
      });
    });
  });
});
