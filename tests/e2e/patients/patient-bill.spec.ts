import { fullTest, TimedFieldsConfigType } from "../helpers/e2e-file-panel";

const ctx = fullTest({
  fileType: "bill",
  fieldsConfig: {
    ...TimedFieldsConfigType
  }
});

// Data in DB are obsolete, but they are calculated live
ctx.testRead({
  patientId: 1,
  fileId: 1,
  data: {
    Date: "2011-06-09",
    "Consult CDC Consultation Physio": 1,
    "Consult Other": undefined,
    "Price asked": 2240
  }
});

// 108

// context("Actions", () => {
//   beforeEach(() => {
//     crLoginInBackground(crApiLogin.PHYSIO);

//     crApiFolderGet(patientFilesCrud.id).then((data) => {
//       data.folder
//         .filter((r) => r.type != "Patient")
//         .map((r) => crApiFicheDelete(r.type, r.id));
//     });

//     patientgo(patientFilesCrud);

//     cy.get("#button_add").should("be.visible").click();
//     cy.get("#add_bill").should("be.visible").click();
//     cy.get("form#fileForm input").should("be.visible");
//   });

//   function setDate(val) {
//     cy.get("#Bill_date")
//       .should("be.visible")
//       .invoke("attr", "value", val)
//       .within(() => {
//         cy.get("input").focus();
//         cy.get("input").blur();
//       });
//   }

//   it("add a bill without a date is an error", () => {
//     setDate("");

//     cy.get("[priceFor]").should("not.exist");
//     cy.get("#errorNoDate").should("be.visible");
//     cy.crCompareSnapshot("without-date");
//   });

//   // it.skip("try to set date in the future", () => {
//   //   setDate("2100-01-01");
//   //   cy.get("#errorDateFuture").should("be.visible");
//   // });

//   it("add a price normally", () => {
//     setDate("2015-01-01");

//     cy.get("[name=consult_give_appointment]").should("exist");
//     cy.get("#errorNoDate").should("not.exist");
//     cy.get("#errorDateFuture").should("not.exist");

//     cy.get("#Bill_consult_home_visit").clear();
//     cy.get("#Bill_consult_home_visit").type("1");

//     cy.get("#total_calculated_raw").should("contain.text", 150);

//     cy.get("#Bill_other_other_consultation_care").clear();
//     cy.get("#Bill_other_other_consultation_care").type("15");

//     cy.get("#total_calculated_raw").should("contain.text", 165);

//     // Let's play with social_level
//     cy.log("Let's play with Social Level");

//     cy.get("[title=Summary]")
//       .should("be.visible")
//       .within(() => {
//         cy.get("#Bill_social_level").should("contain.text", 4);
//         cy.get("#percentage").should("contain.text", "100%");
//         cy.get("#total_calculated_asked").should("contain.text", "165");
//       });

//     cy.get('[title="Social Data"]')
//       .should("be.visible")
//       .within(() => {
//         cy.get("#Bill_sl_family_salary").clear();
//         cy.get("#Bill_sl_family_salary").type("3000");

//         cy.get("#Bill_sl_number_of_household_members").clear();
//         cy.get("#Bill_sl_number_of_household_members").type("3");

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
