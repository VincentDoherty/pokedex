import { describe, test, expect } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache", () => {
  test("stores and retrieves values", () => {
    const cache = new Cache(1000);

    cache.add("test", 42);

    expect(cache.get("test")).toBe(42);
  });

  test.concurrent.each([
    ["a", 1],
    ["b", 2],
    ["c", 3],
  ])("stores multiple values", (key, val) => {
    const cache = new Cache(1000);

    cache.add(key, val);

    expect(cache.get(key)).toBe(val);
  });
});
test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval * 2));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});