import { fn } from "./athelpers.js";
import hash from "../../../legacy/app-old/v2/js/hash.js";

describe(fn(import.meta.url), function () {
  it("should calculate md5", function () {
    expect(hash("abc")).toBe("900150983cd24fb0d6963f7d28e17f72");
    expect(hash("")).toBe("d41d8cd98f00b204e9800998ecf8427e");
  });
});
