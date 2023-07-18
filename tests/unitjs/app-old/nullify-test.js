import nullify from "../../../legacy/app-old/v2/js/nullify.js";

describe("nullify-test", function () {
  it("should nullify string", function () {
    expect(nullify("")).toEqual("");
  });

  it("should nullify string null", function () {
    expect(nullify("null")).toEqual(null);
  });

  it("should nullify string ?", function () {
    expect(nullify("?")).toEqual(null);
  });

  it("should nullify string undefined", function () {
    expect(nullify("undefined")).toEqual(null);
  });

  it("should nullify string anything", function () {
    expect(nullify("anything")).toEqual("anything");
  });

  it("should nullify int 123", function () {
    expect(nullify(123)).toEqual(123);
  });

  it("should nullify object", function () {
    expect(
      nullify({
        a: 1,
        b: "null",
        c: null
      })
    ).toEqual({
      a: 1,
      b: null,
      c: null
    });
  });

  it("should handle null", function () {
    expect(nullify(null)).toBe(null);
  });

  it('should handle "null"', function () {
    expect(nullify("null")).toBe(null);
  });

  it('should handle "?"', function () {
    expect(nullify("?")).toBe(null);
  });

  it("should handle numbers", function () {
    expect(nullify(123)).toBe(123);
  });

  it("should handle strings", function () {
    expect(nullify("hehehe")).toBe("hehehe");
  });

  it("should handle false", function () {
    expect(nullify(false)).toBe(false);
  });

  it("should handle true", function () {
    expect(nullify(true)).toBe(true);
  });

  it("should handle object", function () {
    expect(
      nullify({
        a: 123,
        b: null,
        c: "null",
        d: 456,
        e: "?",
        f: {
          g: "null"
        }
      })
    ).toEqual({
      a: 123,
      b: null,
      c: null,
      d: 456,
      e: null,
      f: {
        g: null
      }
    });
  });
});
