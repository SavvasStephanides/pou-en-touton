import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href={"/game"}>Continue to game</Link>
    </main>
  );
}
