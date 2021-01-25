
import { formGetContent } from '../../app/js/form.js';
import '../../app/elements/x-write.js';
import '../../app/elements/x-write-list.js';
import '../../app/elements/x-inline.js';
import { createElementWith } from '../../app/js/custom-element.js';
// import XWrite from '../../app/elements/x-write.js';
// import XWriteList from '../../app/elements/x-write-list.js';
// import XInline from '../../app/elements/x-inline.js';

export function mockFormSubmit(form) {
    form.dispatchEvent(new CustomEvent('submit', { bubbles: true, cancelable: true }));
}

fdescribe('form-test', function () {
    it('should work with HTML Element', function () {
        const element = createElementWith('form', {}, [
            createElementWith('input', { name: 'n1', value: 'n1val' })
        ]);
        expect(formGetContent(element)).toEqual({
            n1: 'n1val'
        });
    });

    it('should skip elements disabled', function () {
        const element = createElementWith('form', {}, [
            createElementWith('input', { name: 'n1', value: 'n1val', disabled: true })
        ]);

        expect(formGetContent(element)).toEqual({});
    });

    it('should parse int', function () {
        const element = createElementWith('form', {}, [
            createElementWith('input', { name: 'n1', value: '14', type: 'number' })
        ]);
        expect(formGetContent(element)).toEqual({
            n1: 14
        });
    });

    it('should work with NodeList', function () {
        const element = createElementWith('form', {}, [
            createElementWith('input', { name: 'n1', value: 'n1val' })
        ]);
        expect(formGetContent(element.querySelectorAll('input'))).toEqual({
            n1: 'n1val'
        });
    });

    it('should skip elements without name', function () {
        const element = createElementWith('form', {}, [
            createElementWith('input', { value: 'n1val' })
        ]);
        expect(formGetContent(element.querySelectorAll('input'))).toEqual({});
    });




    it('should skip empty values', function () {
        const element = createElementWith('form', {}, [
            createElementWith('input', { name: 'n1', value: '' }),
            createElementWith('input', { name: 'n2', type: 'radio', value: 'n2val' }),
            createElementWith('select', { name: 'n3' }, [
                createElementWith('option', { value: 'n3val1', selected: true }),
                createElementWith('option', { value: 'n3val2' })
            ]),
            // TODO: need XWrite etc... to be migrated to out-of-webDescribe
            // createElementWith(XWrite, { name: 'n4', type: 'list', list: ['n4val1', 'n4val2', 'n4val3'] }),
            // createElementWith(XWriteList, { name: 'n5', list: ['n5val1', 'n5val2', 'n5val3'] }),
            // createElementWith(XInline, { name: 'n6', list: ['n6val1', 'n6val2', 'n6val3'], edit: true }),
            // createElementWith(XInline, { name: 'n7', type: 'char' })
        ]);

        expect(formGetContent(element)).toEqual({
            n3: 'n3val1'
        });

        expect(formGetContent(element, { n1: 'template value' })).toEqual({
            n3: 'n3val1'
        });
    });

    it('should extract info from fields', function () {
        const element = createElementWith('form', {}, [
            createElementWith('input', { name: 'n1', value: 'n1val' }),
            createElementWith('input', { name: 'n2', type: 'radio', value: 'n2val', checked: true }),
            createElementWith('select', { name: 'n3' }, [
                createElementWith('option', { value: 'n3val1', selected: true }),
                createElementWith('option', { value: 'n3val2' })
            ]),
            // TODO: need XWrite etc... to be migrated to out-of-webDescribe
            // createElementWith(XWrite, { name: 'n4', type: 'list', list: ['n4val1', 'n4val2', 'n4val3'] }),
            // createElementWith(XWriteList, { name: 'n5', list: ['n5val1', 'n5val2', 'n5val3'] }),
            // createElementWith(XInline, { name: 'n6', list: ['n6val1', 'n6val2', 'n6val3'], edit: true }),
            // createElementWith(XInline, { name: 'n7', type: 'char' })
        ]);

        expect(formGetContent(element)).toEqual({
            n1: 'n1val',
            n2: 'n2val',
            n3: 'n3val1',
            // n4: 'n4val2',
            // n5: 'n5val2',
            // n6: 'n6val2',
            // n7: 'n7val'
        });
    });
});
