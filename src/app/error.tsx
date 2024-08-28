// app/error.tsx

'use client';

import Link from "next/link";

export default function Error({ error }: { error: Error }) {
  return <div> <Link href='/'>Home</Link> <div>An error occurred: {error.message}</div></div>;
}
