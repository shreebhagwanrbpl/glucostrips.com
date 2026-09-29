import { cache } from "react";
import { fetchFullCatalog as fetchFullCatalogClient, makeSlug, fetchDistrictsList } from "./data-fetcher";
export const fetchFullCatalog = cache(async () => fetchFullCatalogClient());
export const getProductBySlug = cache(async (slug) => { const c=await fetchFullCatalog(); return c.find(p=>p.slug===slug || makeSlug(p.title)===slug) || null; });
export const getAllCategories = cache(async () => { const map=new Map(); (await fetchFullCatalog()).forEach(p=>{const name=p.category||"General"; const slug=makeSlug(name); if(!map.has(slug)) map.set(slug,{name,slug,products:[]}); map.get(slug).products.push(p);}); return [...map.values()]; });
export const getCategoryBySlug = cache(async slug => (await getAllCategories()).find(c=>c.slug===slug)||null);
export const getAllBrands = cache(async()=>{const map=new Map();(await fetchFullCatalog()).forEach(p=>{const name=p.brand||""; if(!name)return;const slug=makeSlug(name);if(!map.has(slug))map.set(slug,{name,slug,products:[]});map.get(slug).products.push(p);});return [...map.values()];});
export { fetchDistrictsList };
