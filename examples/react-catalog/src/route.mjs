import {validBase} from './base.mjs';
export function catalogRouteId(pathname,base='/') {
 if(typeof pathname!=='string'||!pathname.startsWith('/')||!validBase(base))return undefined;
 const prefix=base.replace(/\/$/,''),relative=pathname.startsWith(prefix)?pathname.slice(prefix.length):undefined;
 if(['','/','/index.html','/home/','/home/index.html'].includes(relative))return 'reference-home';
 if(['/examples','/examples/','/examples/index.html'].includes(relative))return 'index';
 if(['/docs/versions','/docs/versions/','/docs/versions/index.html'].includes(relative))return 'reference-docs';
 const references=['language','journal','setup','image-credits','journal/what-a-shell-should-own','docs'];
 const reference=references.find(path=>['/'+path,'/'+path+'/','/'+path+'/index.html'].includes(relative));
 if(reference)return 'reference-'+reference;
 return relative?.match(/^\/examples\/([a-z0-9]+(?:-[a-z0-9]+)*)(?:\/(?:index\.html)?)?$/)?.[1];
}
