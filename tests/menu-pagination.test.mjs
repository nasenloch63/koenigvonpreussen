import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {paginateMenu} from '../lib/menu-pagination.ts';
const menu=JSON.parse(fs.readFileSync(new URL('../content/menu.json',import.meta.url),'utf8'));
test('Book retains every original dish, description and price in original order',()=>{
  const pages=paginateMenu(menu);assert.deepEqual(pages.flatMap(p=>p.dishes),menu);
  assert.equal(new Set(pages.flatMap(p=>p.dishes.map(d=>d.name))).size,26);
});
test('Every category remains directly addressable, with consecutive page parts',()=>{
  const pages=paginateMenu(menu);for(const category of new Set(menu.map(d=>d.category))){
    const group=pages.filter(p=>p.category===category);assert.ok(group.length>0);
    assert.deepEqual(group.map(p=>p.part),group.map((_,i)=>i+1));
    assert.ok(group.every(p=>p.parts===group.length&&p.dishes.length>0&&p.dishes.length<=3&&p.dishes.every(d=>d.category===category)));
  }
});
