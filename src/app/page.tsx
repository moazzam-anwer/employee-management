// app/page.tsx

import Link from 'next/link';
import { UserList } from './components/UserList';

export default async function Home() {
  console.log("in home page ", process.env.NEXT_PUBLIC_API_URL)
  // dynamic rendering
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {cache : "no-store"});
  const users = await res.json();
  console.log("All user received",users)

  return (
    <div className='container'>
      <Link className="btn edit-user-btn" href='users/new'> Add Employee</Link>
      <h1>Employee List</h1>
      <UserList users={users} />
    </div>
  );
}
