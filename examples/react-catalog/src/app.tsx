import {useEffect,useRef,useState} from 'react';
import {DefinitionList,Pagination,DataTable,Disclosure,family} from 'catalog-family';
import type {CatalogPageData,CatalogEntry} from './data-types';
const specialKinds=['gallery','workspace','chat','sensors','scene'];
import type {ReactNode} from 'react';
import {exampleImage} from './assets';
import {DemoForm,Search} from './interactive';
import './style.css';
import {SourceShell} from './shell/SourceShell';
import {Masthead} from './shell/Masthead';
import {ReferenceHome,ReferencePage} from './ReferencePages';
import {CanonicalCatalog} from './CanonicalCatalog';
import {CanonicalRegister} from './CanonicalRegister';
import {formatCatalogDate} from '../../page-archetypes/lib/catalog-date.mjs';
import {isValidEventDateTime,isEventEndBeforeStart} from '../../page-archetypes/lib/event-time.mjs';

type Item={title:string;summary:string;url:string;date?:string;tag?:string;question?:string;answer?:string;label?:string;value?:string;price?:string;features?:string[];image?:string;alt?:string;action?:{label:string;url:string;download?:string}};
type Section={id:string;title:string;kind?:string;body?:string;items?:Item[];facts?:{label:string;value:string}[];actions?:{label:string;url:string;download?:string}[];headers?:string[];rows?:string[][];image?:string;alt?:string;caption?:string;form?:string};
const base=import.meta.env.BASE_URL.replace(/\/$/,'');
const href=(url:string)=>url.startsWith('/')&&!url.startsWith('//') ? `${base}${url}` : url;
function Listing({items,title}:{items:Item[];title:string}) {
 const [page,setPage]=useState(1),[enhanced,setEnhanced]=useState(false);
 const nav=useRef<HTMLElement>(null),pendingFocus=useRef(false);
 useEffect(()=>setEnhanced(true),[]);
 const pageCount=Math.ceil(items.length/3);
 useEffect(()=>{if(!pendingFocus.current)return;pendingFocus.current=false;const buttons=nav.current?.querySelectorAll('button');if(page===1)buttons?.[1]?.focus();else if(page===pageCount)buttons?.[0]?.focus();},[page,pageCount]);
 return <><ul className="example-list">{items.map((item,i)=><li key={item.url} hidden={enhanced&&pageCount>1&&(i<3*(page-1)||i>=3*page)}>
  <div className="example-list__meta">{item.date&&(formatCatalogDate(item.date)?<time dateTime={item.date}>{formatCatalogDate(item.date)}</time>:<span>Invalid date: {item.date}</span>)}{item.tag&&<span className="example-tag">{item.tag}</span>}</div>
  <div><h3><a href={href(item.url)}>{item.title}</a></h3><p>{item.summary}</p></div>
 </li>)}</ul>{enhanced&&pageCount>1&&<Pagination className="example-pagination" ref={nav} page={page} pageCount={pageCount} onPageChange={next=>{pendingFocus.current=true;setPage(next);}} label={`${title} pages`}/>}</>;
}
function SectionView({section,pageId,special,bodies,entries}:{section:Section;pageId:string;special?:(section:unknown)=>ReactNode;bodies:Record<string,string>;entries:CatalogEntry[]}){
 return <section className={`example-section example-section--${section.kind||'prose'}`} data-section={section.id} {...(section.kind==='table'?{'aria-label':`${section.title} section`}:{'aria-labelledby':section.id})}><div className="example-section__label"><h2 id={section.id} tabIndex={-1}>{section.title}</h2></div><div className="example-section__body">
  {section.body&&<div className="recipe-prose example-prose" dangerouslySetInnerHTML={{__html:bodies[`${pageId}-${section.id}`]}}/>}
  {section.kind==='cards'&&(pageId==='documentation'?<ul className="example-documentation-paths">{section.items!.map(item=><li key={item.url}><div className="example-documentation-paths__scope">{item.image&&<img src={exampleImage(item.image)} alt={item.alt} width="720" height="480" loading="lazy"/>}<h3><a href={href(item.url)}>{item.title}</a></h3></div><p>{item.summary}</p></li>)}</ul>:<div className="example-cards">{section.items!.map(item=><article className="example-card" key={item.url}>{item.image&&<img src={exampleImage(item.image)} alt={item.alt} width="720" height="480" loading="lazy"/>}<h3><a href={href(item.url)}>{item.title}</a></h3><p>{item.summary}</p></article>)}</div>)}
  {section.kind==='facts'&&<DefinitionList className="example-facts" items={section.facts!.map((fact,i)=>({id:`${section.id}-${i}`,term:fact.label,description:fact.value}))}/>}
  {section.kind==='listing'&&<Listing title={section.title} items={section.items!}/>}
  {section.kind==='figure'&&<figure className="example-figure"><img src={exampleImage(section.image!)} alt={section.alt!} width="960" height="640" loading="lazy"/><figcaption>{section.caption}</figcaption></figure>}
  {section.kind==='faq'&&<div className={pageId==='faq'?'example-faq example-faq--scoped':'example-faq'}>{pageId==='faq'?['About these examples','Using these examples'].map((title,index)=><section key={title} className="example-question-scope" aria-labelledby={index===0?'faq-about':'faq-using'}><header><h3 id={index===0?'faq-about':'faq-using'}>{title}</h3></header><div>{section.items!.slice(index*2,index===0?2:undefined).map((item,i)=><Disclosure className="krigsvold-faq" key={i} summary={item.question}><div className="example-faq__answer"><p>{item.answer}</p></div></Disclosure>)}</div></section>):section.items!.map((item,i)=><Disclosure className="krigsvold-faq" key={i} summary={item.question}><p>{item.answer}</p></Disclosure>)}</div>}
  {section.kind==='stats'&&<DefinitionList className="example-stats" items={section.items!.map((item,i)=>({id:`${section.id}-${i}`,term:item.label!,description:item.value!}))}/>}
  {section.kind==='plans'&&<div className="example-cards example-plans">{section.items!.map(item=><article className="example-card" key={item.title}><h3>{item.title}</h3><p className="example-price">{item.price}</p><p>{item.summary}</p><ul>{item.features!.map(feature=><li key={feature}>{feature}</li>)}</ul><a className={`${family}-button ${family}-button--primary recipe-action`} href={href(item.action!.url)} download={item.action!.download}>{item.action!.label}</a></article>)}</div>}
  {section.kind==='form'&&<DemoForm kind={section.form!}/>}
  {section.kind==='search'&&<Search entries={entries} title={section.title}/>}
  {section.kind&&specialKinds.includes(section.kind) && (special ? special(section) : (()=>{throw Error(`Missing interactive renderer for ${section.kind}`)})())}
  {section.kind==='table'&&<DataTable caption={section.title}><thead><tr>{section.headers!.map(header=><th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{section.rows!.map((row,i)=><tr key={i}>{row.map((cell,j)=>j===0?<th key={j} scope="row">{cell}</th>:<td key={j}>{cell}</td>)}</tr>)}</tbody></DataTable>}
  {section.actions&&<ul className="recipe-actions example-actions">{section.actions.map((action,index)=><li key={action.url}><a className={`${family}-button ${family}-button--${family==='krigsvold'&&index>0?'secondary':'primary'} recipe-action`} href={href(action.url)} download={action.download}>{action.label}</a></li>)}</ul>}
 </div></section>;
}
export function App({data,special}:{data:CatalogPageData;special?:(section:unknown)=>ReactNode}) {
 const {id,page,rendered:bodies,entries}=data;
 if(id==='reference-home')return <ReferenceHome/>;
 if(data.reference)return <ReferencePage page={data.reference} body={bodies['reference']||''}/>;
 if(id==='index')return <SourceShell current="index"><Masthead title="A collection of possibilities." eyebrow="The example library" summary="Shared content, independent compositions, and clear boundaries between publishing and applications." variant="section"/><CanonicalCatalog entries={entries} href={href}/></SourceShell>;
 if(!page) throw Error(`Unported catalog route: ${id}`);
 return <SourceShell current={page.id} title={page.title}>
  <Masthead title={page.title} eyebrow={page.category+' · Fictional demonstration'} summary={page.summary} date={'date' in page?page.date:undefined} author={'author' in page?page.author:undefined}/>
  <div className={`example-root example-frame--${page.composition}`} data-example={page.id} data-semantic-class={page.semantic_class}><div className={`example-wrap ${['reading','document'].includes(page.composition)?'example-reading':''}`}>
  <nav className="example-breadcrumb" aria-label="Breadcrumb"><a href={href('/')}>Overview</a><span aria-hidden="true">/</span><a href={href('/examples/')}>Examples</a><span aria-hidden="true">/</span><span aria-current="page">{page.semantic_class.replaceAll('-',' ')}</span></nav>
  <div>
  <article aria-labelledby="page-title">{page.show_toc===true&&<nav className="example-local-index" aria-label="Manual contents"><p className="eyebrow">Manual contents</p><ol>{(page.toc??page.sections).map(section=><li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol></nav>}<div className={page.id==='report'?'example-report-body':undefined}>
   {'author' in page && page.author && <nav aria-label="Article context"><a href={href('/examples/person/')}>About {page.author}</a> · <a href={href('/examples/archive/')}>All writing</a></nav>}
   {'tags' in page && page.tags && <ul aria-label="Article subjects">{page.tags.map(tag=><li key={tag}><a href={href('/examples/categories/')}>{tag}</a></li>)}</ul>}
   {'event' in page && page.event && <aside aria-label="Event details"><p><strong>Event details</strong></p><p>{isValidEventDateTime(page.event.start)?<time dateTime={page.event.start}>{page.event.display_start}</time>:<span>{page.event.display_start} (invalid start time)</span>} to {isValidEventDateTime(page.event.end)?<time dateTime={page.event.end}>{page.event.display_end}</time>:<span>{page.event.display_end} (invalid end time)</span>} · {page.event.timezone}</p>{isEventEndBeforeStart(page.event.start,page.event.end)&&<p>Event end is earlier than its start. Check the event times.</p>}<p>{page.event.location} · {page.event.registration}</p></aside>}
   {['changelog','dashboard-components'].includes(page.id)?<CanonicalRegister page={page} rendered={bodies}/>:page.sections.map(section=><SectionView key={section.id} section={section as Section} pageId={page.id} special={special} bodies={bodies} entries={entries}/>)}</div></article></div><p className="example-port-note">A {page.semantic_class.replaceAll('-',' ')} recipe in Krigsvold. <a href={href('/examples/integrations/')}>Capabilities and integration boundaries</a> · <a href={href('/examples/')}>All examples</a></p></div></div>
 </SourceShell>;
}
