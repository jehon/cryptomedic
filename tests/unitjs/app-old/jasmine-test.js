import { loadReference, RefFolder1 } from "./athelpers.js";
import { DataMissingException } from "../../../src/utils/exceptions.js";

describe("Jasmine", function () {
  it("should work as 'expect'", function () {
    var a = true;
    expect(a).toBe(true);
    expect(a).toEqual(true);
  });

  // it('prints jasmine version', function() {
  //   expect(jasmine.version).toMatch('2.5.2');
  // });

  it("manage exceptions", function () {
    expect(function () {
      throw new Error("test");
    }).toThrow(new Error("test"));
    expect(function () {
      throw new DataMissingException("test");
    }).toThrow(new DataMissingException("test"));
  });

  it("load json files", function () {
    let valid_respond = loadReference(RefFolder1);
    expect(valid_respond).not.toBeNull();
    expect(valid_respond.folder[0].type).toBe("Patient");
  });
});
