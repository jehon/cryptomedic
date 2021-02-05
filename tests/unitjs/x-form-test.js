
import XForm from '../../app/elements/widgets/generic/x-form.js';
import '../../app/elements/x-write.js';
import '../../app/elements/x-write-list.js';
import '../../app/elements/x-inline.js';
import { createElementWith } from '../../app/js/custom-element.js';
import { fn } from './athelpers.js';

// import XWrite from '../../app/elements/x-write.js';
// import XWriteList from '../../app/elements/x-write-list.js';
// import XInline from '../../app/elements/x-inline.js';

export function mockFormSubmit(form) {
    form.dispatchEvent(new CustomEvent('submit', { bubbles: true, cancelable: true }));
}

describe(fn(import.meta.url), function () {
    it('should work with HTML Element', function () {
        const element = /** @type {XForm} */ (createElementWith(XForm, {}, [
            createElementWith('input', { name: 'n1', value: 'n1val' })
        ]));

        expect(element.data).toEqual({
            n1: 'n1val'
        });
    });

    it('should skip elements disabled', function () {
        const element = /** @type {XForm} */ (createElementWith(XForm, {}, [
            createElementWith('input', { name: 'n1', value: 'n1val', disabled: true })
        ]));

        expect(element.data).toEqual({});
    });

    it('should parse int', function () {
        const element = /** @type {XForm} */ (createElementWith(XForm, {}, [
            createElementWith('input', { name: 'n1', value: '14', type: 'number' })
        ]));

        expect(element.data).toEqual({
            n1: 14
        });
    });

    it('should skip elements without name', function () {
        const element = /** @type {XForm} */ (createElementWith(XForm, {}, [
            createElementWith('input', { value: 'n1val' })
        ]));

        expect(element.data).toEqual({});
    });

    // TODO: validate
    // TODO: onSubmit
    // TODO: onCancel
    // TODO: onEdit

    describe('with full form', function () {
        let element;
        beforeEach(() => {
            element = /** @type {XForm} */ (createElementWith(XForm, {}, [
                createElementWith('input', { name: 'n1' }),
                createElementWith('input', { name: 'n2', type: 'radio', value: 'n2val1', checked: true }),
                createElementWith('input', { name: 'n2', type: 'radio', value: 'n2val2' }),
                createElementWith('select', { name: 'n3' }, [
                    createElementWith('option', { value: 'n3val1' }),
                    createElementWith('option', { value: 'n3val2' })
                ]),
                // TODO: need XWrite etc... to be migrated to out-of-webDescribe
                // createElementWith(XWrite, { name: 'n4', type: 'list', list: ['n4val1', 'n4val2', 'n4val3'] }),
                // createElementWith(XWriteList, { name: 'n5', list: ['n5val1', 'n5val2', 'n5val3'] }),
                // createElementWith(XInline, { name: 'n6', list: ['n6val1', 'n6val2', 'n6val3'], edit: true }),
                // createElementWith(XInline, { name: 'n7', type: 'char' })
            ]));
        });

        it('should skip empty values', function () {
            expect(element.data).toEqual({
                n2: 'n2val1',
                n3: 'n3val1'
            });
        });

        describe('with values', function () {
            beforeEach(() => {
                element.data = {
                    n1: '123',
                    n2: 'n2val2',
                    n3: 'n3val2'
                };
            });

            it('should set values', function () {
                expect(element.querySelector('[name=n1]').value).toBe('123');
                expect(element.data).toEqual({
                    n1: '123',
                    n2: 'n2val2',
                    n3: 'n3val2'
                });
            });

            it('should reset', function () {
                element.querySelector('[name=n1]').value = '456';
                element.querySelector('[name=n2][value="n2val1"]').checked = true;
                element.querySelector('[name=n2][value="n2val2"]').checked = false;
                element.querySelector('[name=n3]').value = 'n3val1';

                expect(element.data).toEqual({
                    n1: '456',
                    n2: 'n2val1',
                    n3: 'n3val1'
                });

                element.reset();

                expect(element.data).toEqual({
                    n1: '123',
                    n2: 'n2val2',
                    n3: 'n3val2'
                });
            });
        });
    });
});
