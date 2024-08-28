// app/users/[id]/page.tsx (SERVER COMPONENT)

import Link from 'next/link';
// import { redirect } from 'next/navigation';
import DeleteUserButton from '../../components/DeleteUserButton'; // Client component

type Props = {
  params: { id: string };
};

async function getUser(id: string) {
  console.log("getUser");
  
  const res = await fetch(`http://localhost:3000/api/user?id=${id}`);
  if (!res.ok) {
    return undefined;
  }
  let data = await res.json();
  return data;
}

export default async function UserPage({ params }: Props) {
  const userId = params.id;

  console.log("inUserpage", userId);
  const user = await getUser(userId);

  if (!user || !user.name) {
    return (
      <>
        <p>User not found</p>
        <Link href="/">Home</Link>
      </>
    );
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.description}</p>
      <Link className="edit-user-btn" href={`/users/${params.id}/edit`}>Edit User</Link>
      {/* Client-side component for handling the delete action */}
      <DeleteUserButton userId={userId} />
    </div>
  );
}
