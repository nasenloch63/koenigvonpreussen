'use client';

import {useEffect, useMemo, useRef, useState, useSyncExternalStore} from 'react';
import {flushSync} from 'react-dom';
import {Icon} from '@/components/Icon';
import {paginateMenu, type MenuDish, type MenuPage} from '@/lib/menu-pagination';

import {getBookSpreads, spreadForPage} from '@/lib/book-spreads';

const mobileQuery = '(max-width: 760px)';
function subscribeLayout(notify: () => void) {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener('change', notify);
  return () => query.removeEventListener('change', notify);
}
function getMobileLayout() { return window.matchMedia(mobileQuery).matches; }
function getServerLayout() { return false; }

function MenuSheet({page, number}: {page: MenuPage; number: number}) {
  return <article className="menu-sheet" aria-label={`Seite ${number}: ${page.category}`}>
    <header className="menu-sheet-heading"><span className="menu-sheet-number" aria-hidden="true">{String(number).padStart(2, '0')}</span><h3>{page.category}</h3></header>
    <div className="book-dishes">{page.dishes.map(dish => <article className="book-dish" key={dish.name}>
      <div className="book-dish-line"><h4>{dish.name}</h4><strong>{dish.price ?? 'Preis auf Anfrage'}</strong></div>
      <p>{dish.description}</p>
    </article>)}</div>
    <footer className="book-page-foot"><span>König von Preußen · Helsa</span><span>{String(number).padStart(2, '0')}</span></footer>
  </article>;
}

export function MenuBook({dishes}: {dishes: MenuDish[]}) {
  const pages = useMemo(() => paginateMenu(dishes), [dishes]);
  const spreads = useMemo(() => getBookSpreads(pages.length), [pages.length]);
  const mobile = useSyncExternalStore(subscribeLayout, getMobileLayout, getServerLayout);
  const [pageIndex, setPageIndex] = useState(0);
  const [outgoing, setOutgoing] = useState<number[] | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const active = useRef<HTMLDivElement>(null);
  const leaving = useRef<HTMLDivElement>(null);
  const animations = useRef<Animation[]>([]);
  const busy = useRef(false);
  const mounted = useRef(true);
  const gesture = useRef<{x: number; y: number; dx: number; horizontal: boolean} | null>(null);
  const step = mobile ? 1 : 2;
  const start = Math.min(Math.floor(pageIndex / step) * step, Math.max(0, pages.length - 1));
  const spread = spreads[spreadForPage(start)];
  const visible = mobile ? [start] : [spread?.left, spread?.right].filter((index): index is number => index !== null && index !== undefined);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; animations.current.forEach(animation => animation.cancel()); };
  }, []);

  async function go(target: number) {
    if (busy.current || target < 0 || target >= pages.length) return;
    const destination = Math.floor(target / step) * step;
    if (destination === start) return;
    busy.current = true;
    const direction = destination > start ? 1 : -1;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    try {
      flushSync(() => { setOutgoing(visible); setPageIndex(destination); });
      const oldSheet = leaving.current;
      const newSheet = active.current;
      if (!reducedMotion && oldSheet && newSheet) {
        oldSheet.style.transformOrigin = direction > 0 ? 'left center' : 'right center';
        animations.current = [
          oldSheet.animate([
            {transform: 'rotateY(0deg)', opacity: 1},
            {transform: `rotateY(${-direction * 55}deg)`, opacity: .85, offset: .55},
            {transform: `rotateY(${-direction * 105}deg)`, opacity: 0},
          ], {duration: 560, easing: 'cubic-bezier(.22,.7,.2,1)', fill: 'forwards'}),
          newSheet.animate([
            {transform: `translateX(${direction * 24}px)`, filter: 'brightness(.91)'},
            {transform: 'translateX(0)', filter: 'brightness(1)'},
          ], {duration: 560, easing: 'cubic-bezier(.22,.7,.2,1)', fill: 'forwards'}),
        ];
        await Promise.all(animations.current.map(animation => animation.finished));
      }
    } catch {
      // Cancelling an animation on unmount leaves no pending navigation.
    } finally {
      if (mounted.current) flushSync(() => setOutgoing(null));
      animations.current.forEach(animation => animation.cancel());
      animations.current = [];
      busy.current = false;
    }
    if (mounted.current && stage.current && stage.current.getBoundingClientRect().top < -80) {
      stage.current.scrollIntoView({behavior: reducedMotion ? 'instant' : 'smooth', block: 'start'});
    }
  }

  function resetGesture() {
    gesture.current = null;
    if (active.current) active.current.style.transform = '';
  }

  if (!pages.length) return null;
  return <section className="menu-book" aria-labelledby="menu-book-title">
    <div className="book-intro"><h2 id="menu-book-title">Unsere Speisekarte.</h2><p>In Ruhe auswählen.<br/>Wischen oder mit den Pfeilen blättern.</p></div>
    <nav className="book-tabs" aria-label="Speisekarten-Kategorien">{pages.map((page, index) => <button key={page.category} aria-pressed={visible.includes(index)} disabled={outgoing !== null} onClick={() => void go(index)}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{page.category}</button>)}</nav>
    <div className="book-viewer">
      <div className="book-stage" ref={stage} role="region" aria-label="Blätterbare Speisekarte" tabIndex={0}
        onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); void go(start + (event.key === 'ArrowRight' ? step : -step)); } }}
        onPointerDown={event => { if (busy.current || !event.isPrimary || event.button !== 0) return; gesture.current = {x: event.clientX, y: event.clientY, dx: 0, horizontal: false}; }}
        onPointerMove={event => {
          const drag = gesture.current;
          if (!drag || busy.current) return;
          drag.dx = event.clientX - drag.x;
          const dy = event.clientY - drag.y;
          if (!drag.horizontal && Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(drag.dx)) { resetGesture(); return; }
          if (Math.abs(drag.dx) > 12 && Math.abs(drag.dx) > Math.abs(dy) * 1.3) {
            drag.horizontal = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            if (active.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) active.current.style.transform = `translateX(${Math.max(-35, Math.min(35, drag.dx * .2))}px) rotateY(${Math.max(-5, Math.min(5, drag.dx * .025))}deg)`;
          }
        }}
        onPointerUp={() => { const drag = gesture.current; resetGesture(); if (drag?.horizontal && Math.abs(drag.dx) > 45) void go(start + (drag.dx < 0 ? step : -step)); }}
        onPointerCancel={resetGesture} onLostPointerCapture={event => { if (event.target === event.currentTarget) resetGesture(); }}>
        <div className="menu-opening" ref={active} aria-busy={outgoing !== null} data-start={start}>{visible.map(index => <MenuSheet key={index} page={pages[index]} number={index + 1}/>)}</div>
        {outgoing && <div className="menu-opening menu-outgoing" ref={leaving} aria-hidden="true" inert>{outgoing.map(index => <MenuSheet key={index} page={pages[index]} number={index + 1}/>)}</div>}
      </div>
      <div className="book-controls">
        <button aria-label="Vorherige Speisekartenseite" disabled={outgoing !== null || start === 0} onClick={() => void go(start - step)}><Icon name="previous"/><span>Zurück</span></button>
        <div className="book-progress"><p role="status" aria-live="polite">{mobile ? 'Seite' : 'Seiten'} {visible.map(index => index + 1).join('–')} <span>von {pages.length}</span></p><div className="book-progress-track" aria-hidden="true"><span style={{width: `${(visible[visible.length - 1] + 1) / pages.length * 100}%`}}/></div></div>
        <button aria-label="Nächste Speisekartenseite" disabled={outgoing !== null || start + step >= pages.length} onClick={() => void go(start + step)}><span>Weiter</span><Icon name="next"/></button>
      </div>
    </div>
    <details className="book-reading"><summary>Alle Gerichte als Liste lesen</summary>{pages.map((page, index) => <MenuSheet key={page.category} page={page} number={index + 1}/>)}</details>
  </section>;
}

