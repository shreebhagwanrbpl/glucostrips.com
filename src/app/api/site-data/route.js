import { NextResponse } from "next/server";
import { readDocument, readCollection } from "@/lib/sqliteDb";
import { COMPANY_ID, WEBSITE_ID } from "@/lib/catalog-utils";
export const dynamic="force-dynamic"; export const revalidate=0; export const fetchCache="force-no-store";
export async function GET(req){
 const {searchParams}=new URL(req.url); const page=searchParams.get("page")||"home";
 try {
  if(page==="districts") return NextResponse.json({districts:readCollection(`websites/${COMPANY_ID}/${WEBSITE_ID}/districts`)},{headers:{"Cache-Control":"no-store"}});
  if(page==="district"){const d=searchParams.get("district")||""; const data=readDocument(`websites/${COMPANY_ID}/${WEBSITE_ID}/districts/${d}`); return NextResponse.json(data||{});} 
  return NextResponse.json(readDocument(`websites/${COMPANY_ID}/${WEBSITE_ID}/pages/${page}`)||{},{headers:{"Cache-Control":"no-store, no-cache, must-revalidate, max-age=0"}});
 } catch(e){console.error(e);return NextResponse.json({success:false,error:e.message},{status:500});}
}
