/** Zero-based menu-page indexes; null represents the inside cover. */
export type BookSpread = {left:number|null;right:number|null};

export function getBookSpreads(pageCount:number):BookSpread[]{
  if(pageCount<=0)return [];
  return Array.from({length:Math.floor(pageCount/2)+1},(_,index)=>({
    left:index===0?null:index*2-1,
    right:index*2<pageCount?index*2:null,
  }));
}

/** Locate a menu page without changing its original sequence. */
export function spreadForPage(pageIndex:number):number{
  return Math.floor((pageIndex+1)/2);
}
