import TimedMap from "../../../legacy/app-old/v2/js/timedMap.js";

describe("timedMap-test", function () {
  it("should exists a timeCache class", () => {
    expect(new TimedMap() instanceof TimedMap).toBeTruthy();
  });

  it("should handle the empty cache case", () => {
    let tm1 = new TimedMap();
    expect(tm1.get(10)).toBeNull();
  });

  it("should set something and get it back", () => {
    let tm1 = new TimedMap();
    expect(tm1.set(10, 12345)).toBe(12345);
  });

  it("shoud store something, and retrieve it after correctly", () => {
    let tm1 = new TimedMap();
    tm1.set(10, 123);
    tm1.set(11, 456);

    expect(tm1.get(10)).toBe(123);
    expect(tm1.get(11)).toBe(456);

    expect(tm1.count()).toBe(2);
  });

  it("should handle two cache separately", () => {
    let tm1 = new TimedMap();
    let tm2 = new TimedMap();

    tm1.set(10, 1234);
    tm2.set(10, 1111);

    expect(tm1.get(10)).toBe(1234);
    expect(tm2.get(10)).toBe(1111);

    expect(tm1.count()).toBe(1);
    expect(tm2.count()).toBe(1);
  });

  it("should time out old objects", () => {
    // Initialize mocking time
    jasmine.clock().install();
    var baseTime = new Date();
    jasmine.clock().mockDate(baseTime);

    // Initialize
    let tm1 = new TimedMap(1);
    tm1.set(10, 123);

    // Space jump - still ok
    jasmine.clock().tick(990);
    expect(tm1.get(10)).toBe(123);
    expect(tm1.count()).toBe(1);

    // Space jump - expired
    jasmine.clock().tick(11);
    expect(tm1.get(10)).toBe(null);
    expect(tm1.count()).toBe(0);

    // Remove mocking time
    jasmine.clock().uninstall();
  });

  it("should console.info on dump", function () {
    spyOn(console, "info");
    let tm1 = new TimedMap();
    tm1.dump();

    expect(console.info).toHaveBeenCalledTimes(1);
  });
});
