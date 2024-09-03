import Link from "next/link";

export default function Navbars() {
  return (

 <ul className="navbar">
  <li><Link href="/">Home</Link></li>
  <li><Link href="/contact">Contact</Link></li>
  <li><Link href="/about">About</Link></li>
  <li><Link href="/image">Image</Link></li>
</ul>
  );
}
