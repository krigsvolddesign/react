// Native reference documents declare their own trusted table of contents.
// Add only those validated anchors after the shared sanitized Markdown render.
export function referenceHeadingAnchors(html,toc=[]) {
 const ids=new Set();
 for(const item of toc){
  if(typeof item?.id!=='string'||!(/^[a-z][a-z0-9-]*$/).test(item.id)||ids.has(item.id))throw Error('Invalid or duplicate reference heading ID');
  ids.add(item.id);
 }
 if(!ids.size)return html;
 const seen=new Set();
 const result=html.replace(/<h([2-6])>([\s\S]*?)<\/h\1>/g,(heading,level,text)=>{
  const id=text.replace(/<[^>]*>/g,'').trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  if(!ids.has(id))return heading;
  if(seen.has(id))throw Error('Ambiguous reference heading: '+id);
  seen.add(id);return '<h'+level+' id="'+id+'">'+text+'</h'+level+'>';
 });
 for(const id of ids)if(!seen.has(id))throw Error('Reference contents target has no heading: '+id);
 return result;
}

