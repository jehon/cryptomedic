import { fn } from "./athelpers.js";
import {
  toTitleCase,
  toSentenceCase,
  toAttributeCase,
  toPropertyCase,
  _canonize,
  buildTemplate
} from "../../../legacy/app-old/v2/js/string-utils.js";

describe(fn(import.meta.url), function () {
  it("should canonize", function () {
    expect(_canonize("abc def ghi")).toEqual(["abc", "def", "ghi"]);
    expect(_canonize("abc-def-ghi")).toEqual(["abc", "def", "ghi"]);
    expect(_canonize("abc_def_ghi")).toEqual(["abc", "def", "ghi"]);
    expect(_canonize("abcDefGhi")).toEqual(["abc", "def", "ghi"]);
    expect(_canonize("XWithFolder")).toEqual(["x", "with", "folder"]);
    // expect(_canonize('abc_DEF_ghi')).toEqual(['abc', 'DEF', 'ghi']); // TODO
  });

  it("should sentence case", function () {
    expect(toSentenceCase("abc def")).toBe("Abc def");
    expect(toSentenceCase("abc def", false)).toBe("Abc def");
    expect(toSentenceCase("abc def", true)).toBe("abc def");
  });

  it("should title case", function () {
    expect(toTitleCase("abc def")).toBe("Abc Def");
  });

  it("should toPropertyCase case (camel case)", function () {
    expect(toPropertyCase("abc def")).toBe("abcDef");
    expect(toPropertyCase("abc-def")).toBe("abcDef");
    expect(toPropertyCase("abc_def")).toBe("abcDef");
    expect(toPropertyCase("abc def ghi klm")).toBe("abcDefGhiKlm");
    expect(toPropertyCase("abc-def-ghi-klm")).toBe("abcDefGhiKlm");
    expect(toPropertyCase("abc_def_ghi_klm")).toBe("abcDefGhiKlm");
    expect(toPropertyCase("abc def-ghi_klm")).toBe("abcDefGhiKlm");
    expect(toPropertyCase("abc def-ghi_klm", false)).toBe("abcDefGhiKlm");
    expect(toPropertyCase("abc def-ghi_klm", true)).toBe("AbcDefGhiKlm");
  });

  it("should toAttributeCase case (kebab case)", function () {
    expect(toAttributeCase("abcDefGhi")).toBe("abc-def-ghi");
  });

  it("should evalTemplate", function () {
    expect(buildTemplate("${data.id} test")({ id: 123 })).toBe("123 test");
    const truc = 1; // eslint-disable-line no-unused-vars
    expect(() =>
      buildTemplate("${data.id} ${truc} test")({ id: 123 })
    ).toThrowError();
  });
});
