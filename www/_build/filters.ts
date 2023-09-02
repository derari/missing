import type { Site } from "lume/core.ts";

/**
 * Includes the filters:
 *   - `peekHtml` for generating a text extract from HTML
 *   - `repeat`, a loop with extra features
 */
export default () => {
  return (site: Site) => {
    site.filter("peekHtml", peekHtml);
    site.filter("repeat", repeat);
    site.filter("sortSemVer", sortSemVer);
  };
};

function peekHtml(html: string, n = 80) {
  const text = html.replace(/<\/?[^>]+(>|$)/g, "").replace(/\s+/g, " ");
  if (text.length < n) return text;
  else return text.slice(0, n - 1) + "…";
}

interface LoopContext {
  i: number;
  first: boolean;
  last?: boolean;
  sep(s: string): string;
}

function repeat<T>(
  root: Iterable<T>,
  cb: (t: T, loop: LoopContext) => void,
): void {
  // deno-lint-ignore no-explicit-any
  function hasLength(a: any): a is { length: number } {
    return "length" in a && typeof a.length === "number";
  }

  let i = 0;
  for (const t of root) {
    const ctx: LoopContext = {
      i,
      first: i === 0,
      sep(s) {
        return this.last ? "" : s;
      },
    };

    if (hasLength(root)) {
      ctx.last = i === root.length - 1;
    }

    cb(t, ctx);
    i++;
  }
}

function sortSemVer(arr, mapper = i => i) {
  return arr.sort((a, b) => compareSemVer(mapper(a), mapper(b)));
}

function compareSemVer(a, b) {
  // intentionally lax regex
  // ignoring prerelease tags for now since missing doesn't have any
  const svre = /^v?(\d+)\.(\d+)\.(\d+)(-[^\+]*)?/;
  const digitsre = /^\d+$/;
  const [, aMajor, aMinor, aPatch, aPrerelease] = svre.exec(a)!;
  const [, bMajor, bMinor, bPatch, bPrerelease] = svre.exec(b)!;
  const aPrerelTags = aPrerelease?.split(".") ?? [];
  const bPrerelTags = bPrerelease?.split(".") ?? [];
  
  let cmp = Number(aMajor) - Number(bMajor);
  if (cmp === 0) cmp = Number(aMinor) - Number(bMinor);
  if (cmp === 0) cmp = Number(aPatch) - Number(bPatch);
  if (cmp === 0) {
    if      (aPrerelTags.length === 0 && bPrerelTags.length > 0) cmp = 1;
    else if (aPrerelTags.length > 0 && bPrerelTags.length === 0) cmp = -1;
    else cmp = aPrerelTags.length - bPrerelTags.length;
  }
  while (cmp === 0) {
    const aPrerelTag = aPrerelTags.shift();
    const bPrerelTag = bPrerelTags.shift();
    if (!aPrerelTag || !bPrerelTag) break;
    if (digitsre.test(aPrerelTag) && digitsre.test(bPrerelTag)) {
      cmp = Number(aPrerelTag) - Number(bPrerelTag);
    } else {
      cmp = aPrerelTag.localeCompare(bPrerelTag);
    }
  }
  return cmp;
}