import type {CSSProperties} from 'react';
import {referenceHref as href} from './SourceShell';
type Props={title:string;summary?:string;eyebrow?:string;variant?:'signature'|'section'|'compact'|'plain';image?:string;date?:string;author?:string};
export function Masthead({title,summary,eyebrow,variant='compact',image,date,author}:Props){
 const art=image||(variant==='signature'?'hero/krigsvold-hero':variant==='section'?'sections/krigsvold-sea-ice':undefined);
 const widths=variant==='signature'?[640,960,1440,1920,2172]:[640,960,1440,1920],width=variant==='signature'?2172:1920;
 return <><header data-hero-variant={variant} className={`page-masthead hero--${variant} page-masthead--${art?'illustrated':'plain'}`}>
  {art&&<picture className="page-masthead__art" aria-hidden="true"><img src={href(`/assets/images/${art}-${width}.webp`)} srcSet={widths.map(w=>`${href(`/assets/images/${art}-${w}.webp`)} ${w}w`).join(', ')} sizes="100vw" width={width} height={width/3} style={{objectPosition:'center'}} alt="" decoding="async" fetchPriority="high"/></picture>}
  <div className="page-masthead__veil"/><div className="container"><div className="row"><div className="col-lg-9">{eyebrow&&<p className="eyebrow">{eyebrow}</p>}<h1 id="page-title">{title}</h1>{summary&&<p>{summary}</p>}{art&&variant==='section'&&<p className="hero-image-credit"><a href={href('/image-credits/')}>Image credits and licenses</a></p>}<div className="masthead-metadata">{date&&<time dateTime={date}>{date}</time>}{author&&<> · {author}</>}</div></div></div></div>
 </header>{variant==='signature'&&<div className="krigsvold-palette-ribbon" aria-hidden="true">{['#061325','#0a1d35','#123456','#286a9d','#9ed5e6','#d9eef4','#eef8fa','#fbfaf7','#17202a','#56616c','#d9dee2','#b58a3b'].map(color=><span key={color} style={{'--palette-swatch':color} as CSSProperties}/>)}</div>}</>;
}
