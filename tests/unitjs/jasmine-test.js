
import { loadReference } from './athelpers.js';
import { DataMissingException } from '../../app/js/exceptions.js';

describe('Jasmine', function () {
    it('should work as \'expect\'', function () {
        var a = true;
        expect(a).toBe(true);
        expect(a).toEqual(true);
    });

    // it('prints jasmine version', function() {
    //   expect(jasmine.version).toMatch('2.5.2');
    // });

    it('manage exceptions', function () {
        expect(function () { throw 'test'; }).toThrow();
        expect(function () { throw 'test'; }).toThrow('test');
        expect(function () { throw new Error('test'); }).toThrow();
        expect(function () { throw new Error('test'); }).toThrow(new Error('test'));
        expect(function () { throw new DataMissingException('test'); }).toThrow();
        expect(function () { throw new DataMissingException('test'); }).toThrow(new DataMissingException('test'));

        expect(function () { throw new DataMissingException(); }).toThrow(new DataMissingException('some data'));
    });

    it('load json files', function () {
        let valid_respond = loadReference('FolderTest.test1.json');
        expect(valid_respond).not.toBeNull();
        expect(valid_respond.folder[0].type).toBe('Patient');
    });
});
