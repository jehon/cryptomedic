'use strict';

describe('ApplicationException', function() {
  it('should inherit from Error', function() {
    var ae = new ApplicationException('my message');

    expect(ae instanceof Error).toBeTruthy('ApplicationException is not an Error');
    expect(ae.getMessage()).toBe('my message');
  });

  it('should inherit from ApplicationException', function() {
    var ae = new DataMissingException('data');

    expect(ae instanceof ApplicationException).toBeTruthy('DataMissingException is not an ApplicationException');
    expect(ae instanceof Error).toBeTruthy('DataMissingException is not an Error');
    expect(ae.getMessage()).toBe('Missing data');
  });
});
