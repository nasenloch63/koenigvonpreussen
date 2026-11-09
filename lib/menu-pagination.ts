export type MenuDish = {category:string;name:string;description:string;price:string|null};
export type MenuPage = {category:string;part:number;parts:number;dishes:MenuDish[]};
export function paginateMenu(dishes:MenuDish[]):MenuPage[]{
  return [...new Set(dishes.map(d=>d.category))].flatMap(category=>{
    const items=dishes.filter(d=>d.category===category);
    return Array.from({length:Math.ceil(items.length/3)},(_,index)=>({category,part:index+1,parts:Math.ceil(items.length/3),dishes:items.slice(index*3,index*3+3)}));
  });
}
