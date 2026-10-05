import { fetchFullCatalog as a,fetchCategoriesTree as b,fetchCatalogCategories as c,fetchHomeData,fetchContactData,fetchServicesData,fetchDistrictData,fetchDistricts,fetchDistrictsInState,fetchSitePage,fetchDocCached } from "./data-fetcher";
export const dynamic="force-dynamic";
export const fetchFullCatalog=(o={})=>a(o);export const fetchCategoriesTree=(o={})=>b(o);export const fetchCatalogCategories=(o={})=>c(o);
export {fetchHomeData,fetchContactData,fetchServicesData,fetchDistrictData,fetchDistricts,fetchDistrictsInState,fetchSitePage,fetchDocCached};

