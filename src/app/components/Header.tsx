
'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
// import { cookies } from 'next/headers'
import { useState,useEffect } from "react";


// function getCookie(name:string) {
//   const cookieStore = cookies()
//   const cookieData = cookieStore.get(name)
//   console.log(cookieData)
//   return cookieData;
// }

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};

export function Header(props:any) {
  // const isLoggedIn = props.login;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if token is present in cookies
    const token = getCookie('token');
    setIsLoggedIn(!!token);
  }, [router]);
  const handleLogout = async () => {
    
    // Make a request to the logout API
    // await fetch('/api/logout', {
    //   method: 'POST',
    // });
    setIsLoggedIn(false)
    // Clear JWT token from cookies
    document.cookie = 'token=; Max-Age=0; path=/'; // Clear the cookie
  
  
    // Redirect to login page
    router.push('/login');
  };
    return (
      <header>
        <Image src={`/images/logo.webp`} alt="logo" width="64" height="64" />
        <div>
          <h1>Employee Management Application</h1>
          {isLoggedIn && <button className="flex flex-wrap btn-logout" onClick={handleLogout}>Logout</button>}
        </div>
      </header>
    );
  }