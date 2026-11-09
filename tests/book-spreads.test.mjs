import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {getBookSpreads,spreadForPage} from '../lib/book-spreads.ts';
import {paginateMenu} from '../lib/menu-pagination.ts';

const dishes=JSON.parse(fs.readFileSync(new URL('../content/menu.json',import.meta.url),'utf8'));
const pages=paginateMenu(dishes);

test('Physical spreads retain every menu page and dish exactly once in reading order',()=>{
  const spreads=getBookSpreads(pages.length);
  const indexes=spreads.flatMap(spread=>[spread.left,spread.right]).filter(index=>index!==null);
  assert.deepEqual(indexes,pages.map((_,index)=>index));
  assert.deepEqual(indexes.flatMap(index=>pages[index].dishes),dishes);
  assert.equal(spreads.length,3);
  assert.deepEqual(spreads[0],{left:0,right:1});
  assert.deepEqual(spreads.at(-1),{left:4,right:null});
});

test('Two forward and two backward turns restore the first opening symmetrically',()=>{
  const spreads=getBookSpreads(10);
  assert.deepEqual([0,1,2,1,0].map(index=>spreads[index]),[
    {left:0,right:1},{left:2,right:3},{left:4,right:5},
    {left:2,right:3},{left:0,right:1},
  ]);

});

test('Every category jump lands on the opening containing its first page',()=>{
  const spreads=getBookSpreads(pages.length);
  for(const category of new Set(dishes.map(dish=>dish.category))){
    const firstPage=pages.findIndex(page=>page.category===category);
    const spread=spreads[spreadForPage(firstPage)];
    assert.ok([spread.left,spread.right].includes(firstPage));
  }
  const mainIndex=pages.findIndex(page=>page.category==='Hauptgerichte');
  assert.equal(mainIndex,2);
  assert.deepEqual(spreads[spreadForPage(mainIndex)],{left:2,right:3});
});

test('Empty, single, odd and even page counts produce complete bounded openings',()=>{
  assert.deepEqual(getBookSpreads(0),[]);
  assert.deepEqual(getBookSpreads(1),[{left:0,right:null}]);
  assert.deepEqual(getBookSpreads(2),[{left:0,right:1}]);
  assert.deepEqual(getBookSpreads(3),[{left:0,right:1},{left:2,right:null}]);
  for(const count of [1,2,3,9,10,11]){
    const spreads=getBookSpreads(count);
    const indexes=spreads.flatMap(spread=>[spread.left,spread.right]).filter(index=>index!==null);
    assert.deepEqual(indexes,Array.from({length:count},(_,index)=>index));
    for(const index of indexes)assert.ok(Object.values(spreads[spreadForPage(index)]).includes(index));
  }
});
