// app/users/[id]/page.tsx (SERVER COMPONENT)

import Link from 'next/link';
// import { redirect } from 'next/navigation';
import DeleteUserButton from '../../components/DeleteUserButton'; // Client component

type Props = {
  params: { id: string };
};

async function getUser(id: string) {
  console.log("getUser");
  
  const res = await fetch(`http://localhost:3000/api/user?id=${id}`, { cache: 'no-store' });
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
      </>
    );
  }

  return (
    <div>
      <h1> Employee Details</h1>
      <div className='display-container'>
        <div className="display-group">
          <span className='headings'>Name: </span><span>{user.name}</span>
        </div>
        <div className="display-group">
          <span className='headings'>Email: </span><span>{user.email}</span>
        </div>
        <div className="display-group">
          <span className='headings'>Address: </span> 
          <span>{user.address.area}, {user.address.city}, {user.address.state}, {user.address.country}, {user.address.pincode}</span>
        </div>
        <div className="display-group">
          <span className='headings'>Phone: </span><span>{user.phone}</span>
        </div>
        <div className="display-group">
          <span className='headings'>Hobbies: </span> <span>{user.hobbies.join(", ")}</span>
        </div>
        <div className="display-group">
          <span className='headings'>Gender: </span><span>{user.gender}</span>
        </div>
      </div>
      <Link className="edit-user-btn" href={`/users/${params.id}/edit`}>Edit User</Link>
      {/* Client-side component for handling the delete action */}
      <DeleteUserButton userId={userId} />
    </div>
  );
}
