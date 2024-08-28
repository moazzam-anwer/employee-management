// components/UserList.tsx (SERVER COMPONENT)

import Link from 'next/link';

type User = {
  _id: string;
  name: string;
  description: string;
};

export function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.length > 0 ? users.map((user) => (
        <li key={user._id}>
          <Link href={`/users/${user._id}`}>{user.name}</Link>
        </li>
      )) : <p> No User Found</p>}
    </ul>
  );
}
