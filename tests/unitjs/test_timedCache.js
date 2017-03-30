'use strict';
/* global testComponent */

describe('test timedCache', function() {
  it("should exists a timeCache class", () => {
    expect((new TimedCache()) instanceof TimedCache).toBeTruthy();
  });

  it("should handle the empty cache case", () => {
    let tc1 = new TimedCache();
    expect(tc1.get(10)).toBeNull();
  });

  it("should set something and get it back", () => {
    let tc1 = new TimedCache();
    expect(tc1.set(10, 12345)).toBe(12345);
  });

  it("shoud store something, and retrieve it after correctly", () => {
    let tc1 = new TimedCache();
    tc1.set(10, 123);
    tc1.set(11, 456);

    expect(tc1.get(10)).toBe(123);
    expect(tc1.get(11)).toBe(456);

    expect(tc1.count()).toBe(2);
  })

  it("should handle two cache separately", () => {
    let tc1 = new TimedCache();
    let tc2 = new TimedCache();

    tc1.set(10, 1234);
    tc2.set(10, 1111);

    expect(tc1.get(10)).toBe(1234);
    expect(tc2.get(10)).toBe(1111);

    expect(tc1.count()).toBe(1);
    expect(tc2.count()).toBe(1);
  })

  it("should time out old objects", () => {
    // Initialize mocking time
    jasmine.clock().install();
    var baseTime = new Date();
    jasmine.clock().mockDate(baseTime);

    // Initialize
    let tc1 = new TimedCache(1);
    tc1.set(10, 123);

    // Space jump - still ok
    jasmine.clock().tick(990);
    expect(tc1.get(10)).toBe(123);
    expect(tc1.count()).toBe(1);

    // Space jump - expired
    jasmine.clock().tick(11);
    expect(tc1.get(10)).toBe(null);
    expect(tc1.count()).toBe(0);

    // Remove mocking time
    jasmine.clock().uninstall();
  })
});
