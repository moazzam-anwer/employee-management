// app/users/new/page.tsx (CLIENT COMPONENT)

'use client'; // Mark this component as client-side for form handling

import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function Login() {
  console.log("in login componnent")
  const router = useRouter();

  // State to manage form inputs and errors
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to validate the form inputs
  const validate = () => {
    const errors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      errors.username = 'Username is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
  };

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    const validationErrors = validate();
    setErrors(validationErrors);

    // If no errors, proceed to submit
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      try {
        console.log("in login api ", process.env.NEXT_PUBLIC_API_URL)
        const loginres = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        let loginData = await loginres.json()
        if(loginres.status === 200) {
          // Store JWT token in cookies
          document.cookie = `token=${loginData.token}; path=/`;
          console.log("LOGIN SUCCESSFUL")
          router.push('/');
        } else {
          alert("Incorrect Login Credentials");
          // If login fails, redirect to the login page (optional, you might want to just show an error message instead)
          console.log("LOGIN FAILED");
          setIsSubmitting(false);
          return;
        }
      } catch (err) { 
        console.error("Error during login", err);
        alert("An error occurred while trying to login. Please try again later.");
        setIsSubmitting(false);
        return;
      }
    }
  };
  console.log("in login render")

  return (
    <div className="form-container">
      <h1>Login Now</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className='input-group'>
          <label>Name:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        </div>
        <div className='input-group'>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <button type="submit"  disabled={isSubmitting}>{isSubmitting ? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  );
}
