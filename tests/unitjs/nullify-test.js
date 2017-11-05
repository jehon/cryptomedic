
describe('nullify-test', function() {
  it("should nullify string", function() {
    expect(nullify("")).toEqual("");
  });

  it("should nullify string null", function() {
    expect(nullify("null")).toEqual(null);
  });

  it("should nullify string ?", function() {
    expect(nullify("?")).toEqual(null);
  });

  it("should nullify string undefined", function() {
    expect(nullify("undefined")).toEqual(null);
  });

  it("should nullify string anything", function() {
    expect(nullify("anything")).toEqual("anything");
  });

  it("should nullify int 123", function() {
    expect(nullify(123)).toEqual(123);
  });

  it("should nullify object", function() {
    expect(nullify({ a: 1, b: "null", c: null })).toEqual({ a: 1, b: null, c: null });
  })

})