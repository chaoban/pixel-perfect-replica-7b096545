import { matchRoutes } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { routes } from "@/router";

// Match routes without rendering: pages need Supabase env vars and network.
describe("App routing", () => {
  it.each([
    ["/", undefined],
    ["/login", "login"],
    ["/barbers", "barbers"],
  ])("matches a page for %s instead of falling back to not found", (url, path) => {
    const matches = matchRoutes(routes, url);
    const leaf = matches?.at(-1)?.route;

    expect(leaf).toBeDefined();
    expect(leaf?.path).not.toBe("*");
    if (path) expect(leaf?.path).toBe(path);
    else expect(leaf?.index).toBe(true);
  });

  it("falls back to not found for unknown paths", () => {
    expect(matchRoutes(routes, "/dashboard")?.at(-1)?.route.path).toBe("*");
  });
});
