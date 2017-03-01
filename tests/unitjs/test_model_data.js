
describe('Data', function() {
  describe('with empty loader', function() {
    var data = new Data();
    it('should have inheritance ok', function() {
      // expect(data.constructor.name).toBe('Data');
      expect(data instanceof Data).toBeTruthy();
    });
  });

  describe('with data loading at construction time', function() {
    var data = new Data({
      data1: 'data1',
      dataArray: [ 1, 2, 3]
    });

    it('should contain all datas', function() {
      expect(data.data1).toBe('data1');
      expect(data.dataArray).toContain(1);
      expect(data.dataArray).toContain(2);
      expect(data.dataArray).toContain(3);
      expect(data.dataArray).not.toContain(4);
      expect(data.anything).toBeUndefined();
    });
  });


  describe('with data loaded remotely', function() {
    it('should load correctly load_test and store it', function() {
      loadMock('mock_load_test').then(function(data) {
        expect(data.data1).toBe('data1');
        expect(data.dataArray).toContain(1);
        expect(data.dataArray).toContain(2);
        expect(data.dataArray).toContain(3);
        expect(data.dataArray).not.toContain(4);
        expect(data.anything).toBeUndefined();
      });
    });
  });

  describe('with data loaded remotely tested through myAsyncTest', function() {
    it('should load correctly load_test and store it', function() {
      loadMock('mock_load_test').then(function(data) {
        expect(data.data1).toBe('data1');
        expect(data.dataArray).toContain(1);
        expect(data.dataArray).toContain(2);
        expect(data.dataArray).toContain(3);
        expect(data.dataArray).not.toContain(4);
        expect(data.anything).toBeUndefined();
      });
    });
  });

  it('would interpret notSet correctly', function() {
    var data = new create('Data');
    expect(data.data1).toBeUndefined();
    expect(data.isSet('data1')).toBeFalsy();
    expect(data.isNotZero('data1')).toBeFalsy();
    expect(data.data2).toBeUndefined();
    expect(data.isSet('data2')).toBeFalsy();
    expect(data.isNotZero('data2')).toBeFalsy();

    data.data1 = null;
    expect(data.data1).toBe(null);
    expect(data.isSet('data1')).toBeFalsy();
    expect(data.isNotZero('data1')).toBeFalsy();
    expect(data.data2).toBeUndefined();
    expect(data.isSet('data2')).toBeFalsy();
    expect(data.isNotZero('data2')).toBeFalsy();

    data.data2 = 0;
    expect(data.data1).toBe(null);
    expect(data.isSet('data1')).toBeFalsy();
    expect(data.isNotZero('data1')).toBeFalsy();
    expect(data.data2).toBe(0);
    expect(data.isSet('data2')).toBeTruthy();
    expect(data.isNotZero('data2')).toBeFalsy();

    data.data1 = 123;
    expect(data.data1).toBe(123);
    expect(data.isSet('data1')).toBeTruthy();
    expect(data.isNotZero('data1')).toBeTruthy();
    expect(data.data2).toBe(0);
    expect(data.isSet('data2')).toBeTruthy();
    expect(data.isNotZero('data2')).toBeFalsy();
  });
});
