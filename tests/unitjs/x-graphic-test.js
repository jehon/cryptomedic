
import '../../app/elements/widgets/x-graphic.js';

import { fn, loadReference } from './athelpers.js';
import Folder from '../../app/models/Folder.js';

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
            beforeEach(() => {
                const folder = new Folder(loadReference('FolderTest.test1.json').folder);
                expect(folder).toEqual(jasmine.any(Folder));
                element().folder = folder;
            });

            it('should initialize', function () {
                expect(element().innerHTML).not.toContain('No patient');
            });
        });
    });

});