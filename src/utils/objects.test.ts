import assert from "assert";
import test from "node:test";
import { deepFreeze } from "./objects";

test("deepFreeze", () => {
  const obj = deepFreeze({
    val: 1,
    obj: { val: 1, obj: { val: 1, arr: [1, 2, 3] }, arr: [1, 2, 3] },
    arr: [1, 2, 3]
  });

  assert.throws(() => (obj.val = 2));
  assert.throws(() => (obj.arr[2] = 4));
  assert.throws(() => ((obj as any).x = 4));
  assert.throws(() => (obj.obj.val = 2));
  assert.throws(() => (obj.obj.arr[2] = 4));
  assert.throws(() => ((obj.obj as any).x = 4));
  assert.throws(() => obj.arr.push(2));
  assert.throws(() => obj.arr.pop());
  assert.throws(() => obj.obj.obj.arr.pop());
});
