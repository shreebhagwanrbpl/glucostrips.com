export const WEBSITE_ID="glucostripscom";
export const COMPANY_ID="rajbiosis";
export function normalizeDomainId(v=""){return String(v||"").trim().toLowerCase().replace(/^https?:\/\//,"").replace(/^www\./,"").replace(/[.\-\s]/g,"").replace(/[^a-z0-9]/g,"");}
export function isItemVisibleOnWebsite(item,targetWebsiteId=WEBSITE_ID){if(!item||typeof item!=="object")return false;if(item.isPublished===false)return false;const s=String(item.status||"").toLowerCase();if(s==="inactive"||s==="draft")return false;if(Array.isArray(item.websiteIds)){if(!item.websiteIds.length)return false;if(item.websiteIds.some(x=>normalizeDomainId(x)==="all"))return true;return item.websiteIds.some(x=>normalizeDomainId(x)===normalizeDomainId(targetWebsiteId));}return true;}
export function makeSlug(t=""){return String(t||"").toLowerCase().trim().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"");}
export const isItemVisibleForWebsite=isItemVisibleOnWebsite;
