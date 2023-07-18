import { fromBirthDateTo } from "../../../legacy/app-old/v2/widgets/file/x-fff-age.js";
import { toBirthDate } from "../../../legacy/app-old/v2/js/age.js";

describe("calculations.age", function () {
  describe("age and birth", function () {
    const now = new Date(2010, 6, 1);

    it("should return age from birth adequately", function () {
      expect(fromBirthDateTo(toBirthDate(10, 5))).toBe(10 + 5 / 12);
      expect(fromBirthDateTo(toBirthDate(10, 5, now), now)).toBe(10 + 5 / 12);
    });

    it("should return age from birth adequately", function () {
      expect(fromBirthDateTo(toBirthDate(10, 11))).toBe(10 + 11 / 12);
      expect(fromBirthDateTo(toBirthDate(10, 11, now), now)).toBe(10 + 11 / 12);
    });

    it("on 2020-08-30", function () {
      const now = new Date(2020, 7, 30, 20);

      const birthDate = toBirthDate(10, 5, now);
      expect(birthDate).toBe("2010-03");

      expect(fromBirthDateTo(birthDate, now)).toBe(10 + 5 / 12);
    });
  });
});
