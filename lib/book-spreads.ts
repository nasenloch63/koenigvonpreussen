/** Zero-based menu-page indexes. The final opening can have one page. */
export type BookSpread = {left: number; right: number | null};

export function getBookSpreads(pageCount: number): BookSpread[] {
  return Array.from({length: Math.ceil(Math.max(0, pageCount) / 2)}, (_, index) => ({
    left: index * 2,
    right: index * 2 + 1 < pageCount ? index * 2 + 1 : null,
  }));
}

export function spreadForPage(pageIndex: number): number {
  return Math.floor(pageIndex / 2);
}
