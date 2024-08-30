
'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState,useEffect } from "react";
import Navbars from '../components/NavBar';


const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};

export default function header(props:any) {
  // const isLoggedIn = props.login;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if token is present in cookies
    const token = getCookie('token');
    setIsLoggedIn(!!token);
  }, [router]);

  const handleLogout = async () => {
    
    setIsLoggedIn(false)
    // Clear JWT token from cookies
    document.cookie = 'token=; Max-Age=0; path=/'; // Clear the cookie
  
    // Redirect to login page
    router.push('/login');
  };
  return (
    <header>
      <Image src={`/images/logo.webp`} alt="logo" width="64" height="64" />
      <div className='header-container'>
        <h1>Employee Management Applications</h1>
        {isLoggedIn && <button className="btn-logout" onClick={handleLogout}>Logout</button>}
      </div>
     <Navbars />
    </header>
  );
}