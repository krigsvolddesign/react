import {validBase} from '../base.mjs';
import {useEffect,useId,useRef,useState,type MouseEvent,type PointerEvent,type FocusEvent} from 'react';
import {Button,family} from 'catalog-family';
import {peerDashboardURL} from './peer.mjs';
export type DashboardRoute='analytics'|'administration'|'operations';
const entries:{id:DashboardRoute;label:string}[]=[{id:'analytics',label:'Analytics'},{id:'administration',label:'Administration'},{id:'operations',label:'Operations'}];
export function DashboardNav({current,base=import.meta.env.BASE_URL,mode='light',onAppearance,ready=false}:{current?:DashboardRoute;base?:string;mode?:'light'|'dark';onAppearance?:()=>void;ready?:boolean}){
 if(!validBase(base))throw Error('Dashboard base must be an absolute directory path');
 const [enhanced,setEnhanced]=useState(false),[open,setOpen]=useState(false),toggle=useRef<HTMLButtonElement>(null),id=useId(),prefix=base.replace(/\/$/,'');
 useEffect(()=>setEnhanced(true),[]);
 const escape=(event:React.KeyboardEvent)=>{if(event.key==='Escape'&&open){event.preventDefault();setOpen(false);toggle.current?.focus();}};
 const destinations=<ul>{entries.map(entry=><li key={entry.id}><a href={`${prefix}/examples/dashboard-${entry.id}/`} aria-current={current===entry.id?'page':undefined}>{entry.label}</a></li>)}</ul>;
 return <aside className="rd-nav dashboard-rail" aria-label="Dashboard workspace" data-navigation-ready={enhanced?'true':undefined} data-enhanced={enhanced?'true':undefined} data-open={open?'true':'false'} onKeyDown={escape}>
 <div className="dashboard-rail__identity"><a className="dashboard-rail__brand" href={`${prefix}/`}><img src={`${prefix}/assets/mark.svg`} alt="" width="42" height="42"/><span>Krigsvold React</span></a><button ref={toggle} className="rd-nav-toggle dashboard-rail__toggle menu-button ss-menu" type="button" aria-controls={id} aria-expanded={open} hidden={!enhanced} onClick={()=>setOpen(!open)}>Dashboard navigation</button></div>
 <div id={id} className={`dashboard-rail__menus${open?' show':''}`}><nav aria-label="Dashboard navigation"><p className="dashboard-rail__label">Northlight · Workspace</p>{destinations}</nav>
 <nav className="dashboard-rail__reference" aria-label="Krigsvold reference"><p className="dashboard-rail__label">Krigsvold reference</p><ul>{[['The Language','language'],['All Examples','examples'],['Journal','journal'],['Use This Template','setup']].map(([label,path])=><li key={path}><a href={`${prefix}/${path}/`}>{label}</a></li>)}</ul></nav>
 <button className="appearance-toggle ss-appearance" type="button" disabled={!ready} aria-pressed={mode==='dark'} onClick={onAppearance}>{mode==='dark'?'Light mode':'Dark mode'}</button>
 <div className="dashboard-rail__ownership"><a className="dashboard-rail__owner" href="https://jameshoward.us/" aria-label="James Howard website"><img src={`${prefix}/assets/owner.svg`} alt="" width="56" height="56"/><span><strong>Krigsvold React</strong><br/>A website of James Howard</span></a><p>Copyright © 2026 <span>James P. Howard, II</span></p></div></div></aside>;
}
export function DashboardPeerLink({current,peerBase}:{current:DashboardRoute;peerBase?:string}){
 const href=peerDashboardURL(peerBase,current);if(!href)return null;
 const refresh=(event:MouseEvent<HTMLAnchorElement>|PointerEvent<HTMLAnchorElement>|FocusEvent<HTMLAnchorElement>)=>{event.currentTarget.href=peerDashboardURL(peerBase,current,location.search)!;};
 return <a href={href} onPointerEnter={refresh} onFocus={refresh} onClick={refresh} onAuxClick={refresh}>Compare in {family==='martlet'?'Krigsvold':'Martlet'}</a>;
}
