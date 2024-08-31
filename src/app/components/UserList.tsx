// components/UserList.tsx (SERVER COMPONENT)

import Link from 'next/link';
import DeleteUserButton from './DeleteUserButton';

type User = {
  _id: string;
  name: string;
  email: string;
  phone: number;
  gender : string;
};

export function UserList({ users }: { users: User[] }) {
  return (
    <>
      <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
        <thead className='border-b border-neutral-200 font-medium dark:border-white/10'>
          <tr>
            <th className='px-6 py-4'>S.No</th>
            <th className='px-6 py-4'>Name</th>
            <th className='px-6 py-4'>Email</th>
            <th className='px-6 py-4'>Phone</th>
            <th className='px-6 py-4'>Gender</th>
            <th className='px-6 py-4'>Action</th>
          </tr>
          
        </thead>
        <tbody>
          {users.length > 0 ? users.map((user) => (
      
          <tr className='border-b border-neutral-200 dark:border-white/10' key={user._id}>
            <td className='whitespace-nowrap px-6 py-4 font-medium'>{users.indexOf(user) + 1}</td>
            <td className='whitespace-nowrap px-6 py-4 font-medium'>{user.name}</td>
            <td className='whitespace-nowrap px-6 py-4 font-medium'>{user.email}</td>
            <td className='whitespace-nowrap px-6 py-4 font-medium'>{user.phone}</td>
            <td className='whitespace-nowrap px-6 py-4 font-medium'>{user.gender}</td>
            <td className='whitespace-nowrap px-6 py-4 font-medium'>
              <Link className="btn btn-primary" href={`/users/${user._id}`}>View</Link> |
              <Link className="btn btn-success" href={`/users/${user._id}/edit`}>Edit</Link> |
              <DeleteUserButton userId={user._id} />
              {/* <Link href={`/users/${user._id}/delete`}>Delete</Link> */}
            </td>
          </tr>
            )) : <tr><td colSpan={5}> No User Found</td> </tr>}
        </tbody>

      </table>
    </>
  );
}
