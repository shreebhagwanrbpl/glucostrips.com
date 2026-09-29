export const WEBSITE_ID = "glucostripscom";
export const COMPANY_ID = process.env.SQLITE_COMPANY_ID || process.env.COMPANY_ID || "rajbiosis";

export function normalizeDomainId(value = "") {
  return String(value).trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/[.\-\s]/g, "");
}

export function isItemVisibleOnWebsite(item = {}) {
  if (item.isPublished === false) return false;
  if (["inactive", "draft"].includes(String(item.status || "").toLowerCase())) return false;
  if (Array.isArray(item.websiteIds) && item.websiteIds.length === 0) return false;
  if (item.websiteIds == null) return true;
  const target = normalizeDomainId(WEBSITE_ID);
  return item.websiteIds.some((id) => {
    const normalized = normalizeDomainId(id);
    return normalized === "all" || normalized === target;
  });
}

export function makeSlug(text = "") {
  return String(text).toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
}
