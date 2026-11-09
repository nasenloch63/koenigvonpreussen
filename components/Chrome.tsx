"use client";
import Link from 'next/link';import {Icon} from '@/components/Icon';import Image from 'next/image';import {usePathname} from 'next/navigation';import {useRef,useState} from 'react';import links from '@/content/links.json';import company from '@/content/company.json';
const nav=[['Restaurant','/restaurant/'],['Speisekarte','/speisekarte/'],['Hotel','/hotel/'],['Unser Haus','/ueber-uns/'],['Kontakt','/kontakt/']];
export function Chrome({children}:{children:React.ReactNode}){const path=usePathname();const dialog=useRef<HTMLDialogElement>(null),trigger=useRef<HTMLButtonElement>(null);const [open,setOpen]=useState(false);function close(){dialog.current?.close();setOpen(false);trigger.current?.focus()}
return <><header className="site-header"><Link className="brand" href="/"><Image src="/logo-original.svg" width={228} height={60} alt="König von Preußen – Original-Logo mit roter Krone" priority/></Link><nav className="desktop-nav" aria-label="Hauptnavigation">{nav.map(([l,u])=><Link key={u} href={u} aria-current={path===u?'page':undefined}>{l}</Link>)}</nav><a className="header-book" href={links.table}>Tisch reservieren</a><button className="menu-toggle" aria-haspopup="dialog" ref={trigger} aria-expanded={open} aria-controls="navigation-dialog" onClick={()=>{dialog.current?.showModal();setOpen(true)}}>Menü <Icon name="menu"/></button></header><dialog id="navigation-dialog" aria-label="Navigation" className="nav-dialog" ref={dialog} onCancel={e=>{e.preventDefault();close()}}><button className="close" autoFocus onClick={close}>Schließen <Icon name="close"/></button><Link className="brand dialog-brand" href="/" onClick={close}><Image src="/logo-original.svg" width={228} height={60} alt="König von Preußen – Startseite"/></Link><nav aria-label="Mobile Hauptnavigation">{[...nav,['Termine','/termine/'],['Jobs','/jobs/']].map(([l,u])=><Link key={u} href={u} aria-current={path===u?'page':undefined} onClick={close}>{l}</Link>)}</nav><a className="button" href={links.table}>Tisch reservieren</a></dialog>{children}<footer className="footer footer-compact">
<div className="footer-compact-grid">
  <div className="footer-contact">
    <Link className="brand footer-brand" href="/"><Image src="/logo-original.svg" width={228} height={60} alt="König von Preußen – Startseite"/></Link>
    <p>{company.street} · {company.postalCode} {company.city}</p>
    <div className="footer-contact-links"><a href={'tel:'+company.phone}>{company.phoneDisplay}</a><a href={'mailto:'+company.email}>{company.email}</a></div>
    <p className="footer-phone-hours">Telefonisch: {company.phoneHours}</p>
  </div>
  <div className="footer-hours">
    <details suppressHydrationWarning>
      <summary>Restaurant &amp; Küchenzeiten<span aria-hidden="true" className="footer-disclosure"/></summary>
      <div className="footer-hours-content"><dl>{company.restaurantHours.map(([d,h])=><div key={d}><dt>{d}</dt><dd>{h}</dd></div>)}</dl><p>Küche: {company.kitchen}</p></div>
    </details>
    <details suppressHydrationWarning>
      <summary>Hotel &amp; Anreise<span aria-hidden="true" className="footer-disclosure"/></summary>
      <div className="footer-hours-content"><p>Check-in {company.checkIn}<br/>Check-out {company.checkOut}</p><a href={links.booking}>Zimmer buchen</a></div>
    </details>
  </div>
  <nav className="footer-shortcuts" aria-label="Weitere Informationen">
    <Link href="/termine/">Termine</Link><Link href="/jobs/">Arbeiten bei uns</Link>
    <a href={links.instagram}>Instagram</a><a href={links.facebook}>Facebook</a>
    <a className="footer-newsletter" href={links.newsletter}>Newsletter auf der Originalwebsite</a>
  </nav>
</div>
<div className="footer-legal"><Link href="/impressum/">Impressum</Link><Link href="/datenschutz/">Datenschutz</Link><span>Vorabversion · Quellenstand {company.sourceDateLabel}</span></div>
</footer><div className="mobile-actions"><a href={path.startsWith('/hotel')?links.booking:links.table}>{path.startsWith('/hotel')?'Zimmer buchen':'Tisch reservieren'}</a><a href={'tel:'+company.phone}>Anrufen</a></div></>}
