
import { fromBirthDate } from '../../app/elements/widgets/file/x-fff-age.js';
import { toBirthDate } from '../../app/js/age.js';

describe('calculations', function () {
    const now = new Date(2010, 6, 1);

    describe('calculations.age', function () {

        describe('age and birth', function () {
            it('should return age from birth adequately', function () {
                expect(fromBirthDate(toBirthDate(10, 5, now), {
                    reference: now
                })).toBe('10y5m');

                expect(fromBirthDate(toBirthDate(10, 5), {})).toBe('10y5m');
            });
        });
    });
});
