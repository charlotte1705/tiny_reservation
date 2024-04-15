import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function EmailVerification() {
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = new URLSearchParams(location.search).get('token');

      try {
        await axios.get(`http://localhost:7000/verify?token=${token}`);
        setMessage('Email verified successfully');
      } catch (error) {
        setMessage('Email verification failed');
      }
    };

    verifyEmail();
  }, [location]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
}

export default EmailVerification;