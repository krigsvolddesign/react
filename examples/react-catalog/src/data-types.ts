import type catalog from '../../page-archetypes/content/catalog.json';
export type CatalogPage = (typeof catalog.pages)[number] & {show_toc?:boolean;toc?:{id:string;title:string}[]};
export type CatalogEntry = {id:string;title:string;summary:string;category:string;available:boolean};
export type CatalogPageData = {id:string;page:CatalogPage|null;rendered:Record<string,string>;entries:CatalogEntry[];requiresSpecial:boolean;reference?:import('./ReferencePages').ReferenceDocument};
