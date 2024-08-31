'use client'; // Mark this component as client-side for form handling

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export interface Address {
  area: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export default function NewItem() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState<Address>({
    area: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  });
  const [phone, setPhone] = useState('');
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({} as Record<string, string>);

  // Validation function
  const validateForm = () => {
    let formErrors: Record<string, string> = {};

    if (!name.trim()) {
      formErrors.name = 'Name is required';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailPattern.test(email)) {
      formErrors.email = 'A valid email is required';
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phone.trim() || !phonePattern.test(phone)) {
      formErrors.phone = 'A valid 10-digit phone number is required';
    }

    if (!address.area.trim() || !address.city.trim() || !address.state.trim() || !address.country.trim() || !address.pincode.trim()) {
      formErrors.address = 'Complete address is required';
    }

    if(!gender) {
      formErrors.gender = 'Gender is required';
    }

    return formErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Perform validation
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // If no errors, proceed with form submission
    await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, address, phone, hobbies, gender }),
    });

    router.push('/');
  };

  // Handle change for multi-select hobbies
  const handleHobbiesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedHobbies = Array.from(e.target.selectedOptions, (option) => option.value);
    setHobbies(selectedHobbies);
  };

  return (
    <div className="form-container">
      <h1>Add New User</h1>
      <p className="mandatory-fields">* All fields are required </p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="address-div">
          <strong>Address:</strong>
          <div className="input-group">
            <label>Area:</label>
            <input type="text" value={address.area} onChange={(e) => setAddress({ ...address, area: e.target.value })} />
            <label>City:</label>
            <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
            <label>State:</label>
            <input type="text" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
            <label>Country:</label>
            <input type="text" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} />
            <label>Pincode:</label>
            <input type="text" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
        </div>

        <div className="input-group">
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="input-group">
          <label>Hobbies:</label>
          <select multiple value={hobbies} onChange={handleHobbiesChange}>
            <option value="cricket">Cricket</option>
            <option value="music">Music</option>
            <option value="dance">Dance</option>
            <option value="singing">Singing</option>
          </select>
        </div>
        <div className="input-group">
          <label>Gender:</label>
          <div>
            <label>
              <input type="radio" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
              Male
            </label>
            <label>
              <input type="radio" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
              Female
            </label>
          </div>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>

        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
