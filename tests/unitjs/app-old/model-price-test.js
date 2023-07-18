import Price from "../../../legacy/app-old/v2/models/Price.js";

describe("Price", function () {
  describe("with empty loader", function () {
    let data = new Price();
    it("should have inheritance ok", function () {
      expect(data).toEqual(jasmine.any(Price));
    });

    it("should have a correct base url", function () {
      expect(Price.getBaseUrl()).toBe("admin/prices");
    });
  });

  describe("with data loading at construction time", function () {
    let data = new Price({
      data1: "data1",
      dataArray: [1, 2, 3]
    });

    it("should contain all datas", function () {
      expect(data.data1).toBe("data1");
      expect(data.dataArray).toContain(1);
      expect(data.dataArray).toContain(2);
      expect(data.dataArray).toContain(3);
      expect(data.dataArray).not.toContain(4);
      expect(data.anything).toBeUndefined();
    });
  });
});
