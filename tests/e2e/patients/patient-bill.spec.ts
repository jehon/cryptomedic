import { fullTest, TimedFieldsConfigType } from "../helpers/e2e-file-panel";

const ctx = fullTest({
  fileType: "bill",
  fieldsConfig: {
    ...TimedFieldsConfigType,
    Examiner: "select", // Not mandatory, so one more -> not a radio anymore
    "Family Salary": { json: "sl_family_salary", type: "string" },
    "Number of Household Members": {
      json: "sl_number_of_household_members",
      type: "string"
    }
  }
});

// Data in DB are obsolete, but they are calculated live
ctx.testRead({
  patientId: 1,
  fileId: 1,
  data: {
    Date: "2011-06-09",
    "Family Salary": 3000,
    "Number of Household Members": 7,
    Percentage: 10,
    "Price asked": 2240,
    "Consult CDC Consultation Physio": 1,
    "Consult Other": undefined
  }
});

ctx.testCreateDelete({
  patientId: 108,
  data: {
    Date: "2008-02-10",
    Examiner: "Ershad",
    Center: "Ramu",
    "Family Salary": "2000",
    "Number of Household Members": "5"
  },
  initialIsAlreadyGood: true
});

//     // Payment
//     cy.get("#first_payment").type("20");

//     // Save
//     cy.get("#topsubmenu #button_save").should("be.visible").click();
//     crReady();

//     // Check the result page
//     cy.log("Check the result page");

//     cy.get('[title="Social Data"]')
//       .should("be.visible")
//       .within(() => {
//         cy.get("#Bill_sl_family_salary").should("contain.text", "3000");
//         cy.get("#Bill_sl_number_of_household_members").should(
//           "contain.text",
//           "3"
//         );

//         cy.get("x-fff-salary-ratio").should("contain.text", "1000");
//         cy.get("#social_level_calculated").should("contain.text", 2);
//       });

//     cy.get("[title=Summary]")
//       .should("be.visible")
//       .within(() => {
//         cy.get("#Bill_social_level").should("contain.text", 2);
//         cy.get("#percentage").should("contain.text", "40%");
//         cy.get("#total_calculated_asked").should("contain.text", "66");
//       });

//     // TODO: check items
//     // TODO: check payments

//     cy.crCompareSnapshot("-2-view");

//     // TODO: add payment and check
//   });

//   // it.skip("add a bill without a total is an error", () => {
//   //   setDate("2015-01-01");
//   //   cy.get("#top_menu #button_save").click();
//   //   // Error must be shown !
//   // });
// });
