import FolderPage from "../../../legacy/app-old/v2/models/FolderPage.js";

describe("FolderPage", function () {
  describe("with empty loader", function () {
    var data = new FolderPage();
    it("should have inheritance ok", function () {
      expect(data instanceof FolderPage).toBeTruthy();
    });
  });

  describe("with data loading at construction time", function () {
    var data = new FolderPage({
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

    it("should have uid", function () {
      data.id = 123;
      data.getModel = () => "data";
      expect(data.uid()).toBe("data-123");
    });
  });

  it("would interpret notSet correctly", function () {
    var data = new FolderPage();
    expect(data.data1).toBeUndefined();
    expect(data.isSet("data1")).toBeFalsy();
    expect(data.isNotZero("data1")).toBeFalsy();
    expect(data.data2).toBeUndefined();
    expect(data.isSet("data2")).toBeFalsy();
    expect(data.isNotZero("data2")).toBeFalsy();

    data.data1 = null;
    expect(data.data1).toBe(null);
    expect(data.isSet("data1")).toBeFalsy();
    expect(data.isNotZero("data1")).toBeFalsy();
    expect(data.data2).toBeUndefined();
    expect(data.isSet("data2")).toBeFalsy();
    expect(data.isNotZero("data2")).toBeFalsy();

    data.data2 = 0;
    expect(data.data1).toBe(null);
    expect(data.isSet("data1")).toBeFalsy();
    expect(data.isNotZero("data1")).toBeFalsy();
    expect(data.data2).toBe(0);
    expect(data.isSet("data2")).toBeTruthy();
    expect(data.isNotZero("data2")).toBeFalsy();

    data.data1 = 123;
    expect(data.data1).toBe(123);
    expect(data.isSet("data1")).toBeTruthy();
    expect(data.isNotZero("data1")).toBeTruthy();
    expect(data.data2).toBe(0);
    expect(data.isSet("data2")).toBeTruthy();
    expect(data.isNotZero("data2")).toBeFalsy();
  });
});
