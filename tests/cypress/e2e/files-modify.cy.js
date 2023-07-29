import {
  crApiFicheDelete,
  crApiFolderGet,
  crApiLogin
} from "./helpers/cr-api.js";
import {
  crFormFillIn,
  crLoginInBackground,
  crPage,
  crReady
} from "./helpers/cr.js";
import { patientFilesCrud } from "./helpers/e2e-entrynumber-assigned.js";
import { guiAcceptAlert, guiHashStartWith } from "./helpers/gui.js";
import { patientgo } from "./helpers/patients.js";

function checkFileAdd(type, inputData, checkCb) {
  crPage().within(() => {
    cy.get("#button_add").should("be.visible").click();

    cy.get(`#add_${type}`).should("be.visible").click();

    crReady();

    cy.get("form#fileForm").should("be.visible");

    crFormFillIn("form#fileForm", inputData);

    cy.crCompareSnapshot(type + "-1-edit");
    cy.get("#topsubmenu #button_save").should("be.visible").click();

    cy.get("#folder_files .folder_file:nth-child(1) x-button")
      .should("be.visible")
      .click();

    checkCb();
    cy.crCompareSnapshot(type + "-2-read");

    cy.get("#topsubmenu #button_edit").should("be.visible").click();
    crReady();

    cy.get("form#fileForm").should("be.visible");
    cy.get("form#fileForm input").should("be.visible");

    cy.get("#topsubmenu #button_delete").should("be.visible").click();
    guiAcceptAlert();
    crReady();
  });

  guiHashStartWith(`/folder/${patientFilesCrud.id}`, true);

  crApiFolderGet(patientFilesCrud.id).then((data) => {
    cy.wrap(data.folder.length).should("equal", 1);
  });
}

context("Actions", () => {
  beforeEach(() => {
    crLoginInBackground(crApiLogin.PHYSIO);

    crApiFolderGet(patientFilesCrud.id)
      .then((data) => data.folder)
      .then((files) => files.filter((r) => r.type != "Patient"))
      .each((f) => crApiFicheDelete(f.type, f.id));

    patientgo(patientFilesCrud);
  });

  it("should add a ricket_consult", () => {
    checkFileAdd(
      "ricket_consult",
      {
        "#Date": { value: "2003-01-01" },
        "#Weightkg": "13"
      },
      () => {
        cy.get("#Date").should("contain.text", "2003-01-01");
        cy.get("#Weightkg").should("contain.text", "13");
      }
    );
  });

  it("should add an other_consult", () => {
    checkFileAdd(
      "other_consult",
      {
        "#Date": { value: "2003-01-01" },
        "#Weightkg": "13"
      },
      () => {
        cy.get("#Date").should("contain.text", "2003-01-01");
        cy.get("#Weightkg").should("contain.text", "13");
      }
    );
  });

  it("should add a clubfoot", () => {
    checkFileAdd(
      "clubfoot",
      {
        "#Date": { value: "2003-01-01" },
        "#Weightkg": "13"
      },
      () => {
        cy.get("#Date").should("contain.text", "2003-01-01");
        cy.get("#Weightkg").should("contain.text", "13");
      }
    );
  });

  it("should add a surgery", () => {
    checkFileAdd(
      "surgery",
      {
        "#Surgery_Date": { value: "2003-01-01" },
        "#Surgery_report_diagnostic": "diagnostique"
      },
      () => {
        cy.get("#Surgery_Date").should("contain.text", "2003-01-01");
        cy.get("#Surgery_report_diagnostic").should(
          "contain.text",
          "diagnostique"
        );
      }
    );
  });

  //
  // TODO: e2e add a picture test is flakky
  //
  // it('should add a picture', () => {
  //     checkFileAdd('picture', () => {
  //         cy.get('#Picture_Date').invoke('attr', 'value', '2003-01-01');
  //         cy.get('x-input-picture').shadow().find('input[type=file]')
  //             .should('be.visible')
  //             .selectFile('cypress/fixtures/upload.jpg'); // image/gif

  //         crReady();
  //     }, () => {
  //         cy.get('#Picture_Date').should('contain.text', '2003-01-01');
  //         crReady();
  //     });
  // });

  it("should add an appointment", () => {
    checkFileAdd(
      "appointment",
      {
        "#Appointment_Nextappointment": { value: "2100-01-01" },
        "[name=NextCenter]": { value: "Ramu" }
      },
      () => {
        cy.get("#Appointment_Nextappointment").should(
          "contain.text",
          "2100-01-01"
        );
        cy.get("#Appointment_NextCenter").should("contain.text", "Ramu");

        // also in widget
        cy.get("x-ff-next-appointment")
          .shadow()
          .within(() => {
            cy.get("#appointment").should("contain.text", "2100-01-01");
          });
      }
    );
  });
});
