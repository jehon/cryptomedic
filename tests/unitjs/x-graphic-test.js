
import '../../app/elements/widgets/x-graphic.js';

import { fn, loadReference } from './athelpers.js';
import Folder from '../../app/models/Folder.js';

// TODO: use constructor instead of webDescribe

describe(fn(import.meta.url), function () {

    withHtml('<x-graphic></x-graphic>', function (element) {
        describe('without folder', function () {
            beforeEach(() => {
                element().folder = null;
            });

            it('should initialize', function () {
                expect(element().innerHTML).toContain('No patient');
            });
        });

        describe('with invalid patient', function () {
            beforeEach(() => {
                const folder = new Folder(loadReference('FolderTest.test1.json').folder);
                folder.getPatient().Sex = 0;
                element().folder = folder;
            });

            it('should initialize', function () {
                expect(element().innerHTML).toContain('Sex of the patient is unknown');
            });

        });

        describe('with folder', function () {
            let folder;

            beforeEach(() => {
                folder = new Folder(loadReference('FolderTest.test1.json').folder);
                expect(folder).toEqual(jasmine.any(Folder));
                element().folder = folder;
            });

            it('should initialize', function () {
                expect(element().innerHTML).not.toContain('No patient');

                let n = 1;
                expect(folder.getFilesRelatedToPatient(n).id).toBe(13);
                expect(folder.getFilesRelatedToPatient(n).getModel()).toBe('RicketConsult');
                expect(element().displayX(folder.getFilesRelatedToPatient(n))).toBe('16 too high');
                expect(element().displayY(folder.getFilesRelatedToPatient(n))).toBe('Invalid Y');

                n = 2;
                expect(folder.getFilesRelatedToPatient(n).id).toBe(1);
                expect(folder.getFilesRelatedToPatient(n).getModel()).toBe('Bill');
                expect(element().displayX(folder.getFilesRelatedToPatient(n))).toBe('13 too high');
                expect(element().displayY(folder.getFilesRelatedToPatient(n))).toBe('Invalid Y');
            });
        });
    });

});