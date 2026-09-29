import { NextResponse } from "next/server";
import { readDocument, readCollection } from "@/lib/sqliteDb";
import { COMPANY_ID, WEBSITE_ID } from "@/lib/catalog-utils";
export const dynamic="force-dynamic"; export const revalidate=0; export const fetchCache="force-no-store";
export async function GET(req){
 const path=new URL(req.url).searchParams.get("path")||"";
 try{
  const parts=path.split("/");
  if(parts[0]==="websites" && parts[2]==="pages") {
    const page=parts[3]||"home"; const data=readDocument(`websites/${COMPANY_ID}/${WEBSITE_ID}/pages/${page}`); return NextResponse.json({data:data||null});
  }
  if(parts[0]==="websites" && parts[2]==="districts") {
    if(parts[3]) return NextResponse.json({data:readDocument(`websites/${COMPANY_ID}/${WEBSITE_ID}/districts/${parts[3]}`)});
    return NextResponse.json({docs:readCollection(`websites/${COMPANY_ID}/${WEBSITE_ID}/districts`).map(x=>({id:x.id,data:x}))});
  }
  if(path.endsWith("/pages/products")) return NextResponse.json({data:{products:readCollection(`companies/${COMPANY_ID}/products`)}});
  if(path.includes("categoryproducts/categories")){
    const m=path.match(/^websites\/[^/]+\/pages\/categoryproducts\/categories(?:\/([^/]+))?(?:\/subcategories)?$/);
    if(m?.[1]) return NextResponse.json({docs:readCollection(`companies/${COMPANY_ID}/categories/${m[1]}/subcategories`).map(x=>({id:x.id,data:x}))});
    return NextResponse.json({docs:readCollection(`companies/${COMPANY_ID}/categories`).map(x=>({id:x.id,data:x}))});
  }
  return NextResponse.json({data:null,docs:[]});
 }catch(e){return NextResponse.json({error:e.message},{status:500});}
}
