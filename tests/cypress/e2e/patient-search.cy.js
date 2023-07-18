import XButton from "../../../legacy/app-old/v2/widgets/style/x-button.js";
import { crApiLogin } from "./helpers/cr-api.js";
import { crFormFillIn, crLoginInBackground } from "./helpers/cr.js";

/**
 * @param {string}  title of the screenshot
 * @param {object} search to be searched (key=css selector, value)
 * @param {Array<string>} resultList of entrynumbers (year-order) present in the result
 */
function testSearch(title, search, resultList) {
  crLoginInBackground(crApiLogin.RO);
  cy.get("#search_menu > x-buttons > x-button").click();

  cy.get("x-page-search").within((page) => {
    cy.get("x-form").should("be.visible");
    cy.get("x-form").find(`x-button[action="${XButton.Reset}"]`).click();

    crFormFillIn("x-form", search);

    cy.get(`x-form x-button[action="${XButton.Search}"]`).click();

    cy.wrap(page).invoke("attr", "status").should("not.exist");

    cy.get("x-table table tbody")
      .should("be.visible")
      .within(() => {
        // We don't have any more results
        cy.get("tr").should("have.length", resultList.length);

        // Each result is ok
        for (var i in resultList) {
          cy.get(`tr:nth-child(${parseInt(i) + 1}) td:nth-child(2)`).should(
            "contain.text",
            resultList[i]
          );
        }
      });

    cy.crCompareSnapshot(title);
  });
}

context("Actions", () => {
  it("search by entryYear2000", () => {
    testSearch(
      "entryYear",
      {
        '[name="entryyear"]': "2000"
      },
      ["2000-1"]
    );
  });

  it("search by entryYear 2001", () => {
    testSearch(
      "entryYear2001",
      {
        '[name="entryyear"]': "2001"
      },
      ["2001-1", "2001-4"]
    );
  });

  it("search by entryOrder", () => {
    testSearch(
      "entryOrder",
      {
        '[name="entryorder"]': "104"
      },
      ["2014-104"]
    );
  });

  it("search by name", () => {
    testSearch(
      "nameUp",
      {
        '[name="Name"]': "OSMAN"
      },
      ["2014-103"]
    );
    testSearch(
      "nameDown",
      {
        '[name="Name"]': "osman"
      },
      ["2014-103"]
    );
    testSearch(
      "surname",
      {
        '[name="Name"]': "Islam"
      },
      ["2000-1"]
    );
    testSearch(
      "name-partial",
      {
        '[name="Name"]': "OSM"
      },
      ["2014-103"]
    );
  });

  it("search by yearOfBirth", () => {
    testSearch(
      "yearOfBirth",
      {
        '[name="Yearofbirth"]': 2002
      },
      ["2014-107"]
    );
  });

  it("search by phone", () => {
    testSearch(
      "phone",
      {
        '[name="Telephone"]': "1813247984"
      },
      ["2014-105"]
    );
  });

  it("search by pathology", () => {
    testSearch(
      "pathology",
      {
        'x-write-list[name="Pathology"]': {
          value: "ClubFoot"
        }
      },
      ["2014-107", "2014-103", "2014-104", "2014-105", "2000-1"]
    );
  });

  // TODO: search by sex
});
