import "server-only";
import { WEBSITE_ID } from "./catalog-utils";
export const ADMIN_API_BASE_URL = process.env.ADMIN_API_BASE_URL || process.env.ADMIN_API_URL || process.env.SQLITE_ADMIN_API_URL || "https://admin.rajbiosis.app";
export async function adminApiFetch(path, options={}){
 const headers={"Content-Type":"application/json",...(options.headers||{})};
 const body=options.body && typeof options.body!=="string" ? JSON.stringify({...options.body,websiteId:WEBSITE_ID}) : options.body;
 const res=await fetch(`${ADMIN_API_BASE_URL.replace(/\/$/,"")}${path}`,{...options,headers,body,cache:"no-store"});
 const text=await res.text(); let data={}; try{data=text?JSON.parse(text):{};}catch{data={raw:text};}
 if(!res.ok) throw new Error(data?.error||`Admin API ${res.status}`); return data;
}
