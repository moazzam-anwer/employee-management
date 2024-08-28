'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  params: { id: string };
};

export default function EditUser({ params }: Props) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function getUser(id: string) {
      const res = await fetch(`/api/user?id=${id}`);
      if (!res.ok) {
        return undefined;
      }
      let result = await res.json();
      console.log('result===', result);
      if (result.name) {
        setName(result.name);
      }
      if (result.description) {
        setDescription(result.description);
      }
    }
    if (params.id) {
      getUser(params.id);
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/user?id='+params.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });
    router.push('/');
  };

  return (
    <div>
      <Link href="/">Home</Link>
      <h1>Edit Item</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Edit Item</button>
      </form>
    </div>
  );
}
