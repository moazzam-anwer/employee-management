'use client'; // This is a client component

import { useRouter } from 'next/navigation';

type DeleteUserButtonProps = {
  userId: string;
};

const DeleteUserButton = ({ userId }: DeleteUserButtonProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (!userId) return;

    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (!confirmed) return;

    const response = await fetch(`/api/user?id=${userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('User deleted successfully.');
      router.push('/'); // Redirect to items list after deletion
    } else {
      alert('Failed to delete the item.');
    }
  };

  return (
    <button className="btn-delete" onClick={handleDelete}>
      Delete User
    </button>
  );
};

export default DeleteUserButton;
