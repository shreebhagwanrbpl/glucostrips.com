import {fetchFullCatalog,fetchSitePage,fetchDistrictData,fetchDistricts} from "./data-fetcher";
export {fetchFullCatalog as getDynamicCatalog,fetchSitePage as getDynamicPageData,fetchDistricts as getDynamicDistricts,fetchDistrictData as getDynamicDistrictData};
export async function getDynamicProductBySlug(slug=""){const list=await fetchFullCatalog();const s=String(slug).toLowerCase();return list.find(p=>p.slug===slug||String(p.title||"").toLowerCase().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-")===s)||null;}
