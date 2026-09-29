export const db = {};
export function doc(_db, ...parts){ return { path: parts.join("/") }; }
export function collection(_db, ...parts){ return { path: parts.join("/") }; }
export async function getDoc(ref){
  const r=await fetch(`/api/legacy-data?path=${encodeURIComponent(ref.path)}`,{cache:"no-store"});
  const data=await r.json();
  return { exists:()=>Boolean(data?.data), data:()=>data?.data||{} };
}
export async function getDocs(ref){
  const r=await fetch(`/api/legacy-data?path=${encodeURIComponent(ref.path)}`,{cache:"no-store"});
  const data=await r.json(); const docs=(data?.docs||[]).map(x=>({id:x.id,data:()=>x.data}));
  return { empty:docs.length===0, docs, forEach:(fn)=>docs.forEach(fn) };
}
export async function addDoc(ref,data){
  const path=ref.path||"";
  const endpoint=path.includes("productQueries")?"/api/product-query":"/api/contact-query";
  const r=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
  if(!r.ok) throw new Error((await r.text())||"Submission failed");
  return r.json();
}
export function onSnapshot(ref,onNext,onError){
  let stopped=false;
  const run=async()=>{try{const snap=await getDoc(ref);if(!stopped)onNext({exists:snap.exists,data:snap.data});}catch(e){if(!stopped&&onError)onError(e);}};
  run(); const timer=setInterval(run,3000); return ()=>{stopped=true;clearInterval(timer);};
}
