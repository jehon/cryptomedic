/// <reference types="Cypress" />

import { crApiLogin } from '../helpers/cr-api.js';
import { crLoginInBackground } from '../helpers/cr.js';
import { patientFilesRead2000_1, patientFilesRead2001_1, patientFilesRead2014_103, patientFilesRead2014_105 } from '../helpers/e2e-entrynumber-assigned.js';
import { patientgo, patientSelectFile } from '../helpers/patients.js';
import TableIterator from '../helpers/table-iterator.js';

context('Actions', () => {
    beforeEach(() => {
        crLoginInBackground(crApiLogin.RO);
    });

    it('read patient 2000-1', () => { // id: 1
        patientgo(patientFilesRead2000_1).within(() => {
            cy.get('#Patient_Name').should('contain.text', 'rezaul islam');
            cy.get('#Patient_Sex').should('contain.text', 'Male');
            cy.get('#Patient_District').should('contain.text', 'Chittagong');
            cy.get('#Patient_Pathology').should('contain.text', 'ClubFoot');
            cy.get('#button_edit').should('not.exist');

            cy.crCompareSnapshot('patient_2000_1');

            cy.get('#summary').click();
            new TableIterator('#table_summary', { xtable: false })
                // Summary Bill#1
                .row(5).assert('#3')
                .col(4).assert('Sociallevel');

            cy.crCompareSnapshot('patient_2000_1_summary');

            patientSelectFile('OtherConsult', 1);
            cy.get('#Date').should('contain.text', '2007-01-10');
            cy.get('#ExaminerName').should('contain.text', 'Ershad');

            cy.get('x-ff-patient-related').should('exist');
            cy.get('x-ff-patient-related[patient-entry-number="2000-1"]').should('exist');

            cy.get('x-fff-weight-sd').should('contain.text', '0 ds');
            cy.get('x-fff-height-sd').should('contain.text', '0 ds');

            cy.get('x-fff-wh').should('contain.text', '0.22');
            cy.get('x-fff-wh-sd').should('contain.text', 'Some data is out-of-bounds');

            cy.get('x-fff-bmi').should('contain.text', '16.2');
            cy.get('x-fff-bmi-sd').should('contain.text', '0 ds');

            cy.get('#button_edit').should('not.exist');
            cy.crCompareSnapshot('patient_2000_1_otherconsult');

            patientSelectFile('Picture', 2);
            cy.get('#Picture_Date').should('contain.text', '2014-11-04');
            cy.get('#Picture_file').should('contain.text', '10_2014-11-06_15-32-45.JPG');
            cy.get('#img_file').should('be.visible');
            cy.get('#button_edit').should('not.exist');
            cy.crCompareSnapshot('patient_2000_1_picture');

            patientSelectFile('Bill', 1);
            cy.get('#button_edit').should('not.exist');
            cy.get('#Bill_Date').should('contain.text', '2011-06-09');
            // TODO: check bill
            cy.crCompareSnapshot('patient_2000_1_bill');

            patientSelectFile('Surgery', 5);
            cy.get('#Surgery_ReportDiagnostic').should('contain.text', 'test');
            cy.get('#Surgery_FollowUpComplication').should('contain.text', 'nothing');
            cy.crCompareSnapshot('patient_2000_1_surgery');
        });
    });

    it('read patient 2014-105', () => { // id: 5
        patientgo(patientFilesRead2014_105).within(() => {
            cy.get('#Patient_Upazilla').should('contain.text', 'Ukhia');
            cy.get('#Patient_Union_').should('contain.text', 'Jalia palong');
            cy.get('#Patient_Telephone').should('contain.text', '1813247984');

            patientSelectFile('ClubFoot', 1);
            cy.get('#ageAtConsultationTime').should('be.visible');
            cy.get('#ageAtConsultationTime').should('contain.text', '2y0m');
            cy.get('#ClubFoot_Treatment').should('contain.text', 'DB splint');
            // TODO: adapt the data and check them
            cy.get('#button_edit').should('not.exist');
            cy.crCompareSnapshot('patient_2014_105_clubfoot');
        });
    });

    it('read patient 2001-1', () => { // id: 6
        patientgo(patientFilesRead2001_1).within(() => {
            patientSelectFile('RicketConsult', 3);
            // TODO: adapt the data and check them
            cy.get('#button_edit').should('not.exist');
            cy.get('#Date').should('contain.text', '2004-10-06');
            cy.crCompareSnapshot('patient_2001_1_ricketconsult');
        });
    });

    it('read patient 2014-103', () => { // id: 3
        patientgo(patientFilesRead2014_103).within(() => {
            patientSelectFile('Bill', 2);
            new TableIterator('#paymentsList', { xtable: false })
                .col(2).assert('Murshed')
                .nextCol().assert(15)
                .row(2)
                .col(2).assert('Ershad')
                .nextCol().assert(10);
            cy.crCompareSnapshot('patient_2014_103_bill');
        });
    });
});
