
import { DataMissingException } from 'helpers/exceptions';

describe('The browser', function() {
  it('should parse date correctly', function() {
    var d = new Date('2001-02-04T00:00:00Z');
    expect(d.getUTCDate()).toBe(4);
    expect(d.getUTCMonth() + 1).toBe(2);
    expect(d.getUTCFullYear()).toBe(2001);
  });

  // it('should parse timestamp with GMT+0000 correctly', function() {
  //  var d = new Date('2001-02-03 12:13:14 GMT+0000');
  //  expect(d.getDate()).toBe(3);
  //  expect(d.getMonth() + 1).toBe(2);
  //  expect(d.getFullYear()).toBe(2001);

  //  expect(d.getUTCDate()).toBe(3);
  //  expect(d.getUTCMonth() + 1).toBe(2);
  //  expect(d.getUTCFullYear()).toBe(2001);
  //  expect(d.getUTCHours()).toBe(12);
  // });

  // it('should parse timestamp with GMT+0100 correctly', function() {
  //  var d = new Date('2001-02-03 12:13:14 GMT+0100');
  //  expect(d.getDate()).toBe(3);
  //  expect(d.getMonth() + 1).toBe(2);
  //  expect(d.getFullYear()).toBe(2001);

  //  expect(d.getUTCDate()).toBe(3);
  //  expect(d.getUTCMonth() + 1).toBe(2);
  //  expect(d.getUTCFullYear()).toBe(2001);
  //  expect(d.getUTCHours()).toBe(11);
  // });

  it('have a correct DataMissingException', function() {
    expect((new DataMissingException())instanceof Error).toBeTruthy();
    expect((new DataMissingException())instanceof DataMissingException).toBeTruthy();
  });
});
