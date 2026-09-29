const apiBase = () => {
  if (typeof window !== "undefined") return "";
  return process.env.ADMIN_API_BASE_URL || process.env.ADMIN_API_URL || process.env.SQLITE_ADMIN_API_URL || "http://localhost:3000";
};
async function api(path) {
  const res = await fetch(`${apiBase()}${path}`, { cache: "no-store", headers: { "Cache-Control": "no-store" } });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json();
}
export async function fetchFullCatalog(){ const d=await api("/api/catalog"); return d.products || d.catalog || []; }
export async function fetchHomeData(){ return api("/api/site-data?page=home"); }
export async function fetchContactData(){ return api("/api/site-data?page=contact"); }
export async function fetchServicesData(){ return api("/api/site-data?page=services"); }
export async function fetchDistrictData(district){ return api(`/api/site-data?page=district&district=${encodeURIComponent(district||"")}`); }
export async function fetchDistrictsList(){ const d=await api("/api/site-data?page=districts"); return d.districts || []; }
export async function fetchDistrictsInState(){ return fetchDistrictsList(); }
export async function fetchProductBySlug(slug){ const list=await fetchFullCatalog(); return list.find(p=>p.slug===slug || String(p.title||"").toLowerCase().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-")===slug) || null; }
export const makeSlug=(text="")=>String(text).toLowerCase().trim().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-");
