import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebase/firebase';

import Button from '../common/Button';
import Alert from '../common/Alert';


export default function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(userCred);

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div className='container my-4'>
      <div className='card card-body'>

        <h1>Login</h1>

        <form className="mt-4" onSubmit={onFormSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Email address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
            />
          </div>

          <div className='text-center'>
            <Button loading={loading} className='px-5'>
              Login
            </Button>
          </div>
        </form>

        <Alert
          show={error}
          onClose={() => setError('')}
          className='mt-4'>
          {error}
        </Alert>

      </div>
    </div>
  )
}
