import Link from "next/link";


export default function Home({}) {
  return (
    <div>
      Home
      <Link href={"/login"}>
        Login to get started
      </Link>
    </div>
  );
}