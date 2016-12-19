
describe('Jasmine', function() {
  it('should work as \'expect\'', function() {
    var a = true;
    expect(a).toBe(true);
    expect(a).toEqual(true);
  });

  it('prints jasmine version', function() {
    expect(jasmine.version).toMatch('2.4.1');
  });

  it('manage exceptions', function() {
    expect(function() { throw 'test'; }).toThrow();
    expect(function() { throw 'test'; }).toThrow('test');
    expect(function() { throw new Error('test'); }).toThrow();
    expect(function() { throw new Error('test'); }).toThrow(new Error('test'));
    expect(function() { throw new DataMissingException('test'); }).toThrow();
    expect(function() { throw new DataMissingException('test'); }).toThrow(new DataMissingException('test'));
  });

  it('load json files', function() {
    // Thanks to http://stackoverflow.com/a/27830579/1954789
    var valid_respond = readJSON('api/v1.1/tests/references/FolderTest.test1.json');
    expect(valid_respond).not.toBeNull();
    expect(valid_respond[0].type).toBe("Patient");
  })
});
