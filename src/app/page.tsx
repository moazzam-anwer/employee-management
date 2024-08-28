// app/page.tsx

import Link from 'next/link';
import { UserList } from './components/UserList';

export default async function Home() {
  const res = await fetch('http://localhost:3000/api/user');
  const users = await res.json();
  console.log("All user received",users)

  return (
    <div>
      <Link href='users/new'> Add User</Link>
      <h1>Users List</h1>
      <UserList users={users} />
    </div>
  );
}
