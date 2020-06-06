
import { ApplicationException, DataMissingException, ConfigurationMissingException } from '../../app/js/exceptions.js';

describe('ApplicationException', function () {
    it('should inherit from Error', function () {
        var ae = new ApplicationException('my message');

        expect(ae instanceof Error).toBeTruthy('ApplicationException is not an Error');
        expect(ae.getMessage()).toBe('my message');
    });

    it('should have DataMissingException', function () {
        var ae = new DataMissingException('data');

        expect(ae instanceof ApplicationException).toBeTruthy('DataMissingException is not an ApplicationException');
        expect(ae instanceof Error).toBeTruthy('DataMissingException is not an Error');
        expect(ae.getMessage()).toBe('Data is missing');
        expect(ae.data).toBe('data');

        var ae2 = new DataMissingException('data', 'is not null');
        expect(ae2.message).toBe('Data is not null');

        var ae3 = new DataMissingException();
        expect(ae3.message).toBe('Some Data is missing');

    });

    it('should have ConfigurationMissingException', function () {
        var ae = new ConfigurationMissingException('data');

        expect(ae.getMessage()).toBe('Configuration data is missing.');
        expect(ae.data).toBe('data');
    });
});
