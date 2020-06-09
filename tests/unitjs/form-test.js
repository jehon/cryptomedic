
import { webDescribe } from './athelpers.js';
import { formGetContent } from '../../app/js/form.js';
import '../../app/elements/x-write.js';
import '../../app/elements/x-write-list.js';
import '../../app/elements/x-inline.js';

export function mockFormSubmit(form) {
    form.dispatchEvent(new CustomEvent('submit', { 'bubbles': true, 'cancelable': true }));
}

describe('form-test', function () {
    webDescribe('should work with css selector', `<form id='testid0'>
  			<input name='n1' value='n1val'>
		</form>`, function () {
        it('should get values correctly', function () {
            expect(formGetContent('#testid0')).toEqual({
                n1: 'n1val'
            });
        });
    });

    webDescribe('should work with HTML Element', `<form>
  			<input name='n1' value='n1val'>
		</form>`, function (element) {
        it('should get values correctly', function () {
            expect(formGetContent(element())).toEqual({
                n1: 'n1val'
            });
        });
    });

    webDescribe('should skip elements disabled', '<form><input disabled name=\'n1\' value=\'n1val\'></form>', function (element) {
        it('should get values correctly', function () {
            expect(formGetContent(element())).toEqual({});
        });
    });

    webDescribe('should parse int', '<form><input type=\'number\' name=\'n1\' value=\'14\'></form>', function (element) {
        it('should get values correctly', function () {
            expect(formGetContent(element())).toEqual({ n1: 14 });
        });
    });

    webDescribe('should work with NodeList', '<form><input name=\'n1\' value=\'n1val\'></form>', function (element) {
        it('should get values correctly', function () {
            expect(formGetContent(element().querySelectorAll('input'))).toEqual({
                n1: 'n1val'
            });
        });
    });

    webDescribe('should skip elements without name', '<form><input value=\'n1val\'></form>', function (element) {
        it('should get values correctly', function () {
            // When not giving NodeList, the non-named are filtered high in the list
            expect(formGetContent(element().querySelectorAll('input'))).toEqual({});
        });
    });


    webDescribe('should skip empty values', `<form>
  			<input name='n1' value=''>
  			<input type='radio' name='n2' value='n2val'>
  			<select name='n3'>
  				<option value='n3val1'>
  				<option value='n3val2'>
  			</select>
  			<x-write       name='n4' type='list' list='[ "n4val1", "n4val2", "n4val3" ]'></x-write>
  			<x-write-list  name='n5'             list='[ "n5val1", "n5val2", "n5val3", "n5val4", "n5val5", "n5val6", "n5val7" ]'></x-write-list>
	        <x-inline edit name='n6' type='list' list='[ "n6val1", "n6val2", "n6val3" ]'></x-inline>
  			<x-inline edit name='n7' type='char'></x-inline>
 		</form>`, function (element) {
        it('should get values correctly', function () {
            expect(formGetContent(element())).toEqual({
                n3: 'n3val1',
            });
        });

        it('should remove unsetted values', function () {
            expect(formGetContent(element(), { n4: 'template value' })).toEqual({
                n3: 'n3val1'
            });
        });
    });

    webDescribe('should extract info from fields', `<form>
			<input name='n1' value='n1val'>
			<input type='radio' name='n2' value='n2val' checked>
  			<select name='n3'>
  				<option value='n3val1'>
  				<option value='n3val2' selected>
  			</select>
	        <x-write       name='n4' type='list' value='n4val2' list='[ "n4val1", "n4val2", "n4val3" ]'></x-write>
	        <x-write-list  name='n5'             value='n5val2' list='[ "n5val1", "n5val2", "n5val3", "n5val4", "n5val5", "n5val6", "n5val7" ]'></x-write-list>
	        <x-inline edit name='n6' type='list' value='n6val2' list='[ "n6val1", "n6val2", "n6val3" ]'></x-inline>
	        <x-inline edit name='n7' type='char' value='n7val' ></x-inline>
  		</form>`, function (element) {
        it('should get values correctly', function () {
            expect(formGetContent(element())).toEqual({
                n1: 'n1val',
                n2: 'n2val',
                n3: 'n3val2',
                n4: 'n4val2',
                n5: 'n5val2',
                n6: 'n6val2',
                n7: 'n7val'
            });
        });
    });
});
