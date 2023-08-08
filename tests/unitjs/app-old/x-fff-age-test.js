import XFffAge, {
  fromBirthDate,
  fromBirthDateTo
} from "../../../legacy/app-old/v2/widgets/file/x-fff-age.js";

import {
  fn,
  loadReference,
  RefFolder1,
  RefFolder1RicketConsult13
} from "./athelpers.js";
import Folder from "../../../src/app-folder/business/folder.js";

describe(fn(import.meta.url), function () {
  describe("fromBirthDateTo", function () {
    const now = new Date(2010, 6, 1);
    const nowPlus5 = new Date(2015, 6, 1);

    // Same
    it("should handle yearOfBirth of string/4 vs. same", function () {
      expect(fromBirthDateTo("2000", "2000")).toBe(0);
    });

    it("should handle yearOfBirth of string/4 vs. same string/04", function () {
      expect(fromBirthDateTo("2000", "2000-01")).toBe(0);
    });

    it("should handle yearOfBirth of string/7 vs. same", function () {
      expect(fromBirthDateTo("2000-01", "2000-01")).toBe(0);
    });

    // String/7 vs...
    it("should handle yearOfBirth of string/7 vs. string/7", function () {
      expect(fromBirthDateTo("2000-05", "2010-05")).toBe(10);
    });

    it("should handle yearOfBirth of string/7 vs. string/7", function () {
      expect(fromBirthDateTo("2000-05", "2010-06")).toBe(10 + 1 / 12);
    });

    it("should handle yearOfBirth of string/7 vs. date", function () {
      expect(fromBirthDateTo("2000-05", now)).toBe(10 + 2 / 12);
    });

    // String/4 vs...
    it("should handle yearOfBirth of string/4 vs. string/7", function () {
      expect(fromBirthDateTo("2000", "2010-06")).toBe(10 + 5 / 12);
    });

    it("should handle yearOfBirth of string/4 vs. date", function () {
      expect(fromBirthDateTo("2000", now)).toBe(10.5);
    });

    it("should handle yearOfBirth of string/4 vs. same", function () {
      expect(fromBirthDateTo("2000", 2000)).toBe(0);
    });

    it("should have (string/4) a default value for reference", function () {
      expect(fromBirthDateTo("2000")).toBeGreaterThan(20);
    });

    // Int vs...
    it("should handle yearOfBirth of number vs. date", function () {
      expect(fromBirthDateTo(2000, now)).toBe(10.5);
    });

    it("should have (int) a default value for reference", function () {
      expect(fromBirthDateTo(2000)).toBeGreaterThan(20);
    });

    // date vs...
    it("should handle yearOfBirth of date vs. date", function () {
      expect(fromBirthDateTo(now, nowPlus5)).toBe(5);
    });

    it("should handle yearOfBirth of date vs. date (format object)", function () {
      expect(fromBirthDateTo(now, nowPlus5)).toEqual(5);
    });

    it("should handle yearOfBirth of date vs. date (format number)", function () {
      expect(fromBirthDateTo(now, nowPlus5)).toEqual(5);
    });

    // Invalid
    it("should handle empty yearOfBirth", function () {
      expect(() => fromBirthDateTo("", nowPlus5)).toThrow();
    });

    it("should handle empty yearOfBirth", function () {
      expect(() => fromBirthDateTo(null, nowPlus5)).toThrow();
    });

    it("should handle yearOfBirth invalid", function () {
      expect(() => fromBirthDateTo("199", nowPlus5)).toThrow();
    });

    it("should handle yearOfBirth invalid (format object)", function () {
      expect(() => fromBirthDateTo("199", nowPlus5)).toThrow();
    });

    it("should handle yearOfBirth invalid (format object)", function () {
      expect(() => fromBirthDateTo("199", nowPlus5)).toThrow();
    });

    it("should handle ref invalid (format object)", function () {
      expect(() => fromBirthDateTo("2000", "199")).toThrow();
    });
  });

  // TODO: remove
  describe("BirthDate2Age (legacy)", function () {
    const now = new Date(2010, 6, 1);
    const nowPlus5 = new Date(2015, 6, 1);

    // Same
    it("should handle yearOfBirth of string/4 vs. same", function () {
      expect(
        fromBirthDate("2000", {
          reference: "2000"
        })
      ).toBe("0y0m");
    });

    it("should handle yearOfBirth of string/4 vs. same string/04", function () {
      expect(
        fromBirthDate("2000", {
          reference: "2000-01"
        })
      ).toBe("0y0m");
    });

    it("should handle yearOfBirth of string/7 vs. same", function () {
      expect(
        fromBirthDate("2000-01", {
          reference: "2000-01"
        })
      ).toBe("0y0m");
    });

    // String/7 vs...
    it("should handle yearOfBirth of string/7 vs. string/7", function () {
      expect(
        fromBirthDate("2000-05", {
          reference: "2010-05"
        })
      ).toBe("10y0m");
    });

    it("should handle yearOfBirth of string/7 vs. string/7", function () {
      expect(
        fromBirthDate("2000-05", {
          reference: "2010-06"
        })
      ).toBe("10y1m");
    });

    it("should handle yearOfBirth of string/7 vs. date", function () {
      expect(
        fromBirthDate("2000-05", {
          reference: now
        })
      ).toBe("10y2m");
    });

    // String/4 vs...
    it("should handle yearOfBirth of string/4 vs. string/7", function () {
      expect(
        fromBirthDate("2000", {
          reference: "2010-06"
        })
      ).toBe("10y5m");
    });

    it("should handle yearOfBirth of string/4 vs. date", function () {
      expect(
        fromBirthDate("2000", {
          reference: now
        })
      ).toBe("10y6m");
    });

    // Int vs...
    it("should handle yearOfBirth of number vs. date", function () {
      expect(
        fromBirthDate(2000, {
          reference: now
        })
      ).toBe("10y6m");
    });

    // date vs...
    it("should handle yearOfBirth of date vs. date", function () {
      expect(
        fromBirthDate(now, {
          reference: nowPlus5
        })
      ).toBe("5y0m");
    });

    it("should handle yearOfBirth of date vs. date (format object)", function () {
      expect(
        fromBirthDate(now, {
          reference: nowPlus5,
          format: "object"
        })
      ).toEqual({
        years: 5,
        months: 0
      });
    });

    it("should handle yearOfBirth of date vs. date (format number)", function () {
      expect(
        fromBirthDate(now, {
          reference: nowPlus5,
          format: "number"
        })
      ).toEqual(5);
    });

    // Invalid
    it("should handle empty yearOfBirth", function () {
      expect(
        fromBirthDate("", {
          reference: nowPlus5
        })
      ).toBe("?");
    });

    it("should handle empty yearOfBirth", function () {
      expect(
        fromBirthDate(null, {
          reference: nowPlus5
        })
      ).toBe("?");
    });

    it("should handle yearOfBirth invalid", function () {
      expect(
        fromBirthDate("199", {
          reference: nowPlus5
        })
      ).toBe("?");
    });

    it("should handle yearOfBirth invalid (format object)", function () {
      expect(
        fromBirthDate("199", {
          reference: nowPlus5,
          format: "object"
        })
      ).toBe(null);
    });

    it("should handle yearOfBirth invalid (format object)", function () {
      expect(
        fromBirthDate("199", {
          reference: nowPlus5,
          format: "number"
        })
      ).toBe(null);
    });
  });

  describe("with x-fff-age", function () {
    let f;
    beforeEach(function () {
      f = new Folder(loadReference(RefFolder1).folder);
    });

    it("should show nothing without file", function () {
      const el = new XFffAge();
      el.folder = f;
      expect(() => el.value).toThrow();
      expect(el.innerText).toBe("");
    });

    it("should show patient age", function () {
      const el = new XFffAge();
      el.folder = f;
      el.file = f.getPatient();

      expect(el.value).toBeGreaterThan(22);
      expect(parseInt(el.innerText.split("m")[0])).toBeGreaterThan(21);
    });

    it("should show file age", function () {
      const el = new XFffAge();
      el.folder = f;
      el.file = f.getByUid(RefFolder1RicketConsult13);

      expect(el.value).toBe(16);
      expect(el.innerText).toBe("16y0m");
    });
  });
});
