
import { fn, webDescribe } from './athelpers.js';
import { _evaluatePoly, _stdDeviation, stdDeviationFor, sigma } from '../../app/elements/widgets/x-standard-deviation.js';
import { DataInvalidException, DataOutOfBoundException, ConfigurationMissingException } from '../../app/js/exceptions.js';

fdescribe(fn(import.meta.url), function () {
    const poly = {
        'min': [],
        'medium': [],
        'max': []
    };

    poly.min.push([0, 0]);
    poly.min.push([10, 15]);

    poly.medium.push([0, 1]);
    poly.medium.push([1, 2]);
    poly.medium.push([2, 4]);
    poly.medium.push([5, 10]);
    poly.medium.push([10, 20]);

    poly.max.push([0, 2]);
    poly.max.push([10, 30]);

    it('evaluatePoly correctly', function () {
        expect(_evaluatePoly(poly.medium, -1)).toBeNaN();
        expect(_evaluatePoly(poly.medium, 11)).toBeNaN();
        expect(_evaluatePoly(poly.medium, 0)).toBe(1);
        expect(_evaluatePoly(poly.medium, 1)).toBe(2);
        expect(_evaluatePoly(poly.medium, 5)).toBe(10);
        expect(_evaluatePoly(poly.medium, 10)).toBe(20);
        expect(_evaluatePoly(poly.medium, 1.5)).toBe(3);
        expect(_evaluatePoly(poly.medium, 7.5)).toBe(15);
        expect(_evaluatePoly(poly.medium, 1.1)).toBe(2.2);
    });

    it('calculate standard deviations', function () {
        expect(_stdDeviation(poly, 0, 1)).toBe(0);
        expect(_stdDeviation(poly, 0, 0)).toBe(-sigma);
        expect(_stdDeviation(poly, 0, 2)).toBe(sigma);
        expect(() => _stdDeviation(poly, -1, 2)).toThrow(new DataOutOfBoundException());

        expect(stdDeviationFor('m', 'Weightkg', 10, 32)).toBe(0);
        expect(stdDeviationFor('m', 'Weightkg', 10, 42)).toBeCloseTo(sigma);
        expect(stdDeviationFor('f', 'Weightkg', 3, 13.8)).toBe(0);
        expect(() => stdDeviationFor('f', 'invalid', 3, 13.8)).toThrow(jasmine.any(ConfigurationMissingException));
        expect(() => stdDeviationFor('invalid', 'Weightkg', 3, 13.8)).toThrow(jasmine.any(DataInvalidException));
        expect(() => stdDeviationFor('m', 'Weightkg', 99, 13.8)).toThrow(jasmine.any(DataOutOfBoundException));
    });

    webDescribe('initialized', '<x-standard-deviation></x-standard-deviation>', function (element) {
        it('should have an error', function () {
            expect(element().hasAttribute('error')).toBeTruthy();
            expect(element().innerHTML[0]).toBe('#');
            expect(element().getAttribute('error')).toBe('invalid_sex');
        });
    });

    webDescribe('with s', '<x-standard-deviation sex="m"></x-standard-deviation>', function (element) {
        it('should have an error', function () {
            expect(element().hasAttribute('error')).toBeTruthy();
            expect(element().innerHTML[0]).toBe('#');
            expect(element().getAttribute('error')).toBe('invalid_graph_name');
        });
    });

    webDescribe('with s,gn', '<x-standard-deviation sex="m" graph-name="Heightcm"></x-standard-deviation>', function (element) {
        it('should have an error', function () {
            expect(element().hasAttribute('error')).toBeTruthy();
            expect(element().innerHTML[0]).toBe('#');
            expect(element().getAttribute('error')).toBe('invalid_x');
        });
    });

    webDescribe('with s,gn,x', '<x-standard-deviation sex="m" graph-name="Heightcm" x=20></x-standard-deviation>', function (element) {
        it('should have an error', function () {
            expect(element().hasAttribute('error')).toBeTruthy();
            expect(element().innerHTML[0]).toBe('#');
            expect(element().getAttribute('error')).toBe('invalid_y');
        });
    });

    webDescribe('with s,gn,x,y', '<x-standard-deviation sex="m" graph-name="Heightcm" x=4 y=96></x-standard-deviation>', function (element) {
        it('should have an error', function () {
            expect(element().hasAttribute('error')).toBeFalse();
            expect(element().innerHTML).toBe('-1.8');
        });
    });

    webDescribe('with out-of-bound', '<x-standard-deviation sex="m" graph-name="Heightcm" x=24 y=96></x-standard-deviation>', function (element) {
        it('should have an error', function () {
            expect(element().hasAttribute('error')).toBeTruthy();
            expect(element().innerHTML[0]).toBe('#');
            expect(element().getAttribute('error')).toBe('stats');
        });
    });
});
