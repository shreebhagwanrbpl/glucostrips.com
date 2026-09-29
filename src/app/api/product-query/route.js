import { NextResponse } from "next/server";
import { adminApiFetch } from "@/lib/admin-api";
export const dynamic="force-dynamic";
export async function POST(req){ try{ const body=await req.json(); const data=await adminApiFetch("/product-query",{method:"POST",body:JSON.stringify(body)}); return NextResponse.json(data); }catch(e){ console.error(e); return NextResponse.json({success:false,error:e.message},{status:500}); } }
