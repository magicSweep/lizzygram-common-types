import { isObject } from "./helper";

test("isObject", () => {
  expect(isObject(undefined)).toEqual(false);
});
