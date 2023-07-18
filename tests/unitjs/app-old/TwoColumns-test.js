import TwoColumns from "../../../legacy/app-old/v2/js/twoColumns.js";

import XFile from "../../../legacy/app-old/v1/elements/x-file.js";

describe("twoColumns", function () {
  beforeEach(function () {
    this.OBJ = new XFile();
    this.OBJ.value = {
      a: 1,
      b: 2
    };
  });

  it("should be instanciated", function () {
    const tc = new TwoColumns(new XFile());
    expect(tc.addLine("truc")).toEqual(jasmine.any(TwoColumns));
    expect(tc.addLines(["brol"])).toEqual(jasmine.any(TwoColumns));
    const html = tc.toString();
    expect(html).toContain("<table");
    expect(html).toContain("</table>");
    expect(html).not.toContain("truc");
    expect(html).not.toContain("brol");

    // Double closure ?
    expect(tc.toString()).not.toContain("</table></table>");
  });

  it("should handle objects", function () {
    const tc = new TwoColumns(this.OBJ);
    tc.addLines(["a", "b", "c"]);
    const html = tc.toString();
    expect(html).toContain("name='a'");
    expect(html).toContain("b");
  });

  it("should custom labels objects", function () {
    const tc = new TwoColumns(this.OBJ, {
      label: (l) => "truc_" + l,
      id_scope: "brol_"
    });
    tc.addLines(["a", "b", "c"]);
    const html = tc.toString();
    expect(html).toContain("name='a'");
    expect(html).toContain("b");
    expect(html).toContain("id='brol_a'");
    expect(html).toContain("<td>truc_a</td>");
  });
});
