import type {CatalogPage} from './data-types';

// Native krigsvold composition from krigsvolddesign/jekyll 25dd494485759fc5b62022941b5e2c41505c2993.
function releaseFields(title:string) {
 const parts=title.split(' · ');
 if(parts.length!==2)return null;
 const match=/^(January|February|March|April|May|June|July|August|September|October|November|December) (\d{1,2}), (\d{4})$/.exec(parts[1]);
 if(!match)return null;
 const month=['January','February','March','April','May','June','July','August','September','October','November','December'].indexOf(match[1]);
 const day=Number(match[2]),year=Number(match[3]),date=new Date(Date.UTC(year,month,day));
 if(date.getUTCFullYear()!==year||date.getUTCMonth()!==month||date.getUTCDate()!==day)return null;
 return {version:parts[0],label:parts[1],iso:date.toISOString().slice(0,10)};
}

export function CanonicalRegister({page,rendered}:{page:CatalogPage;rendered:Record<string,string>}) {
 if(page.id==='changelog')return <div className="example-release-register">{page.sections.map(section=>{const date=releaseFields(section.title);return <section key={section.id} className="example-section example-release" aria-labelledby={section.id}><header className="example-release__scope"><h2 id={section.id}>{date?<><span className="example-release__version">{date.version}</span><span className="example-release__separator"> · </span><time dateTime={date.iso}>{date.label}</time></>:section.title}</h2></header><div className="example-section__body"><div className="example-prose" dangerouslySetInnerHTML={{__html:rendered[page.id+'-'+section.id]}}/></div></section>})}</div>;
 if(page.id==='dashboard-components')return <div className="example-component-register">{page.sections.map(section=><section key={section.id} className="example-section example-component-register__entry" aria-labelledby={section.id}><header className="example-component-register__scope"><h2 id={section.id}>{section.title}</h2></header><div className="example-section__body"><div className="example-prose" dangerouslySetInnerHTML={{__html:rendered[page.id+'-'+section.id]}}/></div></section>)}</div>;
 return null;
}

