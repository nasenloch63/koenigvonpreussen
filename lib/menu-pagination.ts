export type MenuDish = {category:string;name:string;description:string;price:string|null};
export type MenuPage = {category:string;part:number;parts:number;dishes:MenuDish[]};
export function paginateMenu(dishes:MenuDish[]):MenuPage[]{
  return [...new Set(dishes.map(dish => dish.category))].map(category => ({
    category,
    part: 1,
    parts: 1,
    dishes: dishes.filter(dish => dish.category === category),
  }));
}
