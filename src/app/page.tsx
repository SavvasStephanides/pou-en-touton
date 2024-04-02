import Link from "next/link";

export default function Home() {
  const BASE_PATH = process.env.BASE_PATH  
  return (
    <main>
      <div style={{display: "flex", marginTop: "30px"}}>
        <img src={`${BASE_PATH}/pouentouto-logo.png`} alt="" style={{width: "300px", display: "block", "margin": "auto"}}/>
      </div>
      
      <div style={{display: "flex"}}>
        <Link href={"/game"} style={{display: "block", margin: "auto", marginTop: "30px", border: "1px solid #333", padding: "9px 12px", textDecoration: "none", borderRadius: "6px", color: "black", fontWeight: "bold"}}>Continue to game</Link>
      </div>
    </main>
  );
}
