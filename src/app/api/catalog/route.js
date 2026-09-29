import { NextResponse } from "next/server";
import { getSQLiteDb, readCollection } from "@/lib/sqliteDb";
import { COMPANY_ID, WEBSITE_ID, isItemVisibleOnWebsite, makeSlug } from "@/lib/catalog-utils";
export const dynamic="force-dynamic"; export const revalidate=0; export const fetchCache="force-no-store";
export async function GET(){
  try {
    const db=getSQLiteDb();
    const cats=readCollection(`companies/${COMPANY_ID}/categories`);
    const visibleCats=new Map(cats.filter(isItemVisibleOnWebsite).map(c=>[c.id,c]));
    const products=[];
    for(const cat of cats){
      if(!visibleCats.has(cat.id)) continue;
      const subs=readCollection(`companies/${COMPANY_ID}/categories/${cat.id}/subcategories`);
      for(const sub of subs){
        if(!isItemVisibleOnWebsite(sub)) continue;
        const embedded=Array.isArray(sub.products)?sub.products:[];
        for(const p of embedded){ if(isItemVisibleOnWebsite(p)) products.push({...p,category:p.category||cat.category||cat.name||cat.title,subCategory:p.subCategory||sub.subCategory||sub.name,slug:p.slug||makeSlug(p.title)}); }
        const child=readCollection(`companies/${COMPANY_ID}/categories/${cat.id}/subcategories/${sub.id}/products`);
        for(const p of child){ if(isItemVisibleOnWebsite(p)) products.push({...p,category:p.category||cat.category||cat.name||cat.title,subCategory:p.subCategory||sub.subCategory||sub.name,slug:p.slug||makeSlug(p.title)}); }
      }
    }
    for(const p of readCollection(`companies/${COMPANY_ID}/products`)){
      if(!isItemVisibleOnWebsite(p)) continue;
      if(p.categoryId && !visibleCats.has(p.categoryId)) continue;
      if(p.category && cats.length && !cats.some(c=>isItemVisibleOnWebsite(c)&&(c.category||c.name||c.title)===p.category)) continue;
      products.push({...p,slug:p.slug||makeSlug(p.title)});
    }
    const unique=new Map(products.map((p,i)=>[p.id||p.uid||p.slug||`${p.title}-${i}`,p]));
    return NextResponse.json({success:true,websiteId:WEBSITE_ID,products:[...unique.values()]},{headers:{"Cache-Control":"no-store, no-cache, must-revalidate, max-age=0"}});
  } catch(e){ console.error(e); return NextResponse.json({success:false,error:e.message,products:[]},{status:500}); }
}
