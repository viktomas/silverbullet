import { assertEquals } from "$std/testing/asserts.ts";
import { cleanupJSON, deepEqual, deepObjectMerge } from "./json.ts";

Deno.test("utils", () => {
  assertEquals(deepEqual({ a: 1 }, { a: 1 }), true);
  assertEquals(deepObjectMerge({ a: 1 }, { a: 2 }), { a: 2 });
  assertEquals(
    deepObjectMerge({ list: [1, 2, 3] }, { list: [4, 5, 6] }),
    { list: [1, 2, 3, 4, 5, 6] },
  );
  assertEquals(deepObjectMerge({ a: { b: 1 } }, { a: { c: 2 } }), {
    a: { b: 1, c: 2 },
  });
  assertEquals(cleanupJSON({ "a.b": 1 }), { a: { b: 1 } });
  assertEquals(cleanupJSON({ a: { "a.b": 1 } }), {
    a: { a: { b: 1 } },
  });
  assertEquals(cleanupJSON({ a: [{ "a.b": 1 }] }), {
    a: [{ a: { b: 1 } }],
  });
});
