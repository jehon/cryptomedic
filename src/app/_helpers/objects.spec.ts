import { deepFreeze } from "./objects";

describe("objects helpers", () => {
  it("deepFreeze", () => {
    const obj = deepFreeze({
      val: 1,
      obj: { val: 1, obj: { val: 1, arr: [1, 2, 3] }, arr: [1, 2, 3] },
      arr: [1, 2, 3]
    });

    expect(() => (obj.val = 2)).toThrow();
    expect(() => (obj.arr[2] = 4)).toThrow();
    expect(() => ((obj as any).x = 4)).toThrow();
    expect(() => (obj.obj.val = 2)).toThrow();
    expect(() => (obj.obj.arr[2] = 4)).toThrow();
    expect(() => ((obj.obj as any).x = 4)).toThrow();
    expect(() => obj.arr.push(2)).toThrow();
    expect(() => obj.arr.pop()).toThrow();
    expect(() => obj.obj.obj.arr.pop()).toThrow();
  });
});
