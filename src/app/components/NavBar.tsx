import Link from "next/link";

export default function Navbars() {
  return (

 <ul className="navbar">
  <li><Link href="/">Home</Link></li>
  <li><Link href="#">Contact</Link></li>
  <li><Link href="#">About</Link></li>
</ul>
  );
}
