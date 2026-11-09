'use client';
import Image from 'next/image';
import {memo,useEffect,useMemo,useRef,useState} from 'react';
import {flushSync} from 'react-dom';
import {Icon} from '@/components/Icon';
import {paginateMenu,type MenuDish,type MenuPage} from '@/lib/menu-pagination';
import {getBookSpreads,spreadForPage} from '@/lib/book-spreads';

function PageContent({page}:{page:MenuPage}){
  return <><div className="book-page-heading"><span className="eyebrow">DIE BASISKARTE</span><h3>{page.category}</h3>{page.parts>1&&<span className="book-part">{page.part} / {page.parts}</span>}</div><div className="book-dishes">{page.dishes.map(d=><article className="book-dish" key={d.name}><div><h4>{d.name}</h4><strong>{d.price??'Preis auf Anfrage'}</strong></div><p>{d.description}</p></article>)}</div></>;
}
const MenuPageContent=memo(function MenuPageContent({page,number}:{page:MenuPage;number:number}){
  return <><PageContent page={page}/><div className="book-page-foot"><span>König von Preußen · Helsa</span><span>{String(number).padStart(2,'0')}</span></div></>;
});
function BookCover({welcome=false}:{welcome?:boolean}){
  return <><Image className="book-logo" src="/logo-original.svg" width={228} height={60} loading="eager" alt="König von Preußen"/><div className="book-cover-copy"><span>Landgasthof in Helsa</span>{welcome&&<p>Guten<br/><em>Appetit.</em></p>}<div className="book-cover-rule"/><span>Restaurant · Biergarten</span></div><span className="book-edition">DIE BASISKARTE</span></>;
}

export function MenuBook({dishes}:{dishes:MenuDish[]}){
  const pages=useMemo(()=>paginateMenu(dishes),[dishes]);
  const spreads=useMemo(()=>getBookSpreads(pages.length),[pages.length]);
  const categories=useMemo(()=>[...new Set(dishes.map(d=>d.category))],[dishes]);
  const leafCount=Math.ceil(pages.length/2);
  const [index,setIndex]=useState(0),[turning,setTurning]=useState<number|null>(null),[navigating,setNavigating]=useState(false);
  const [prepared,setPrepared]=useState<number|null>(null);
  const book=useRef<HTMLDivElement>(null);
  const mobileAnimations=useRef<Animation[]>([]);
  const leaves=useRef<(HTMLDivElement|null)[]>([]),busy=useRef(false),alive=useRef(true),animation=useRef<Animation|null>(null);
  useEffect(()=>{alive.current=true;return()=>{alive.current=false;animation.current?.cancel();mobileAnimations.current.forEach(a=>a.cancel());}},[]);

  async function go(target:number){
    if(busy.current||target===index||target<0||target>=spreads.length)return;
    // Mobile keeps the destination painted beneath a two-sided turning sheet.
    if(window.matchMedia('(max-width: 760px)').matches){
      busy.current=true;
      try{
        flushSync(()=>{setPrepared(target);setNavigating(true);});
        const sheets=[...book.current?.querySelectorAll<HTMLElement>('.book-mobile-turn')??[]];
        sheets.forEach(sheet=>sheet.getBoundingClientRect());
        if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
          const angle=target>index?-180:180;
          mobileAnimations.current=sheets.filter(sheet=>typeof sheet.animate==='function').map(sheet=>sheet.animate(
            [{transform:'rotateY(0deg)'},{transform:`rotateY(${angle}deg)`}],
            {duration:680,easing:'cubic-bezier(.45,0,.2,1)',fill:'forwards'}));
          await Promise.all(mobileAnimations.current.map(a=>a.finished));
        }
        if(alive.current)flushSync(()=>{setIndex(target);setPrepared(null);setNavigating(false);});
      }catch{ /* Unmount can cancel a turn. */ }
      finally{mobileAnimations.current.forEach(a=>a.cancel());mobileAnimations.current=[];busy.current=false;if(alive.current){setPrepared(null);setNavigating(false);}}
      return;
    }
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){setIndex(target);return;}
    busy.current=true;setNavigating(true);
    const direction=target>index?1:-1,duration=Math.abs(target-index)>1?460:820;
    try{
      for(let position=index;position!==target;position+=direction){
        const leafIndex=direction>0?position:position-1;
        const element=leaves.current[leafIndex];
        flushSync(()=>setTurning(leafIndex));
        if(element&&typeof element.animate==='function'){
          // Both faces belong to one persistent leaf. Only its angle changes.
          animation.current=element.animate([
            {transform:`rotateY(${direction>0?0:-180}deg)`,boxShadow:'0 0 0 #1d1d1b00'},
            {transform:'rotateY(-90deg)',boxShadow:'10px 8px 25px #1d1d1b25',offset:.5},
            {transform:`rotateY(${direction>0?-180:0}deg)`,boxShadow:'0 0 0 #1d1d1b00'},
          ],{duration,easing:'cubic-bezier(.45,0,.2,1)',fill:'forwards'});
          await animation.current.finished;
        }
        if(!alive.current)return;
        // Land the same leaf before cancelling the animation: no blank frame.
        flushSync(()=>{setIndex(position+direction);setTurning(null);});
        animation.current?.cancel();animation.current=null;
      }
    }catch{ /* Navigation unmounts may cancel an animation. */ }
    finally{animation.current?.cancel();animation.current=null;busy.current=false;if(alive.current){setTurning(null);setNavigating(false);}}
  }
  if(!spreads.length)return null;
  const spread=spreads[index];
  const visiblePages=[spread.left,spread.right].filter((p):p is number=>p!==null);
  const visibleCategories=[...new Set(visiblePages.map(p=>pages[p].category))];
  const ready=(opening:number)=>Math.abs(opening-index)<=1||opening===prepared;
  const pageLabel=visiblePages.map(p=>p+1).join('–');

  return <section className="menu-book" aria-labelledby="menu-book-title">
    <div className="book-intro"><div><span className="eyebrow">BLÄTTERN & ENTDECKEN</span><h2 id="menu-book-title">Unsere Speisekarte.</h2></div><p>Seite für Seite zum Lieblingsgericht.<br/>Mit den Buttons oder den Pfeiltasten blättern.</p></div>
    <nav className="book-tabs" aria-label="Speisekarten-Kategorien">{categories.map((category,i)=><button key={category} aria-pressed={visibleCategories.includes(category)} aria-disabled={navigating} onClick={()=>void go(spreadForPage(pages.findIndex(p=>p.category===category)))}><span aria-hidden="true">0{i+1}</span>{category}</button>)}</nav>
    <div className="book-viewer"><div className="book-stage" role="region" aria-label="Blätterbare Speisekarte" tabIndex={0} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();void go(index+(e.key==='ArrowRight'?1:-1));}}}>
      <div className="book-spread" ref={book} aria-busy={navigating} data-spread={index} data-mobile-turning={prepared!==null}>
        <div className="book-measures" aria-hidden="true" inert>{pages.map((page,i)=><div className="book-sheet book-sizer" key={i}><MenuPageContent page={page} number={i+1}/></div>)}</div>
        <aside className="book-base book-base-left book-frontispiece" data-underlay={prepared===0} data-ready={ready(0)} data-visible={index===0} aria-hidden={index!==0} inert={index!==0} aria-label="Begrüßungsseite"><BookCover welcome/></aside>
        <aside className="book-base book-base-right book-frontispiece" data-underlay={prepared===spreads.length-1} data-ready={ready(spreads.length-1)} data-visible={spread.right===null} aria-hidden={spread.right!==null} inert={spread.right!==null} aria-label="Abschlussseite"><BookCover/></aside>
        {prepared!==null&&(['left','right'] as const).map(side=>{
          const from=spread[side],to=spreads[prepared][side];
          return <div className={`book-mobile-slot book-mobile-${side}`} key={side} aria-hidden="true" inert><div className="book-mobile-turn" data-direction={prepared>index?'forward':'backward'}>
            <div className={`book-mobile-face book-mobile-front ${from===null?'book-frontispiece':'book-sheet'}`}>{from===null?<BookCover welcome={side==='left'}/>:<MenuPageContent page={pages[from]} number={from+1}/>}</div>
            <div className={`book-mobile-face book-mobile-back ${to===null?'book-frontispiece':'book-sheet'}`}>{to===null?<BookCover welcome={side==='left'}/>:<MenuPageContent page={pages[to]} number={to+1}/>}</div>
          </div></div>;
        })}
        {Array.from({length:leafCount},(_,i)=>{
          const front=i*2,back=front+1,flipped=i<index;
          const frontVisible=spread.right===front,backVisible=spread.left===back;
          return <div className="book-leaf" key={i} ref={element=>{leaves.current[i]=element;}} data-leaf={i} data-flipped={flipped} data-turning={turning===i} style={{zIndex:turning===i?leafCount*2+1:flipped?i+1:leafCount-i}}>
            <div className="book-face book-face-front book-sheet" data-underlay={prepared!==null&&spreads[prepared].right===front} data-page={front+1} data-ready={ready(spreadForPage(front))} data-visible={frontVisible} aria-hidden={!frontVisible} inert={!frontVisible}><MenuPageContent page={pages[front]} number={front+1}/></div>
            <div className={`book-face book-face-back ${pages[back]?'book-sheet':'book-frontispiece'}`} data-underlay={prepared!==null&&spreads[prepared].left===back} data-page={pages[back]?back+1:undefined} data-ready={ready(spreadForPage(back))} data-visible={backVisible} aria-hidden={!backVisible} inert={!backVisible}>{pages[back]?<MenuPageContent page={pages[back]} number={back+1}/>:<BookCover/>}</div>
          </div>;
        })}
      </div>
    </div>
    <div className="book-controls"><button className="button outline" aria-label="Vorherige Speisekartenseite" aria-disabled={navigating||index===0} onClick={()=>void go(index-1)}><Icon name="previous"/>Zurück</button><p role="status" aria-live="polite" aria-atomic="true"><strong>{visiblePages.length===1?'Seite':'Seiten'} {pageLabel} von {pages.length}</strong><span>{visibleCategories.join(' · ')}</span></p><button className="button" aria-label="Nächste Speisekartenseite" aria-disabled={navigating||index===spreads.length-1} onClick={()=>void go(index+1)}>Weiter<Icon name="next"/></button></div></div>
    <details className="book-reading" suppressHydrationWarning><summary>Alle Gerichte als Liste lesen</summary>{categories.map(category=><section className="menu-section" key={category}><h3>{category}</h3>{dishes.filter(d=>d.category===category).map(d=><article className="dish" key={d.name}><div><h4>{d.name}</h4><p>{d.description}</p></div><strong>{d.price??'Preis auf Anfrage'}</strong></article>)}</section>)}</details>
  </section>;
}
