import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebase/firebase';

import FileService from '../../services/file.service';
import ProfileService from '../../services/profile.service';

import Button from '../common/Button';
import Alert from '../common/Alert';
import ImageSelector from '../common/ImageSelector';
import { Profile } from '../../models/profile';

export default function RegisterPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [file, setFile] = useState(null);


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // upload the image file
      const imageUrl = await uploadProfilePicture();

      // create profile with downloadUrl, name , surname
      ProfileService.saveProfile(new Profile({
        id: userCredentials.user.uid,
        name: name,
        surname: surname,
        imageUrl: imageUrl,
      }));

      navigate('/');
    } catch (err) {
      setError('');
    }
    setLoading(false);
  }

  async function uploadProfilePicture() {
    const downloadUrl = await FileService.uploadImage(file);
    return downloadUrl;
  }

  return (
    <div className='container my-4'>
      <div className='card card-body'>

        <h1>Register</h1>

        <form className="mt-4" onSubmit={onFormSubmit}>

          <ImageSelector
            title="Profile Picture"
            onFileChange={(file) => setFile(file)}
          />

          <div className="mb-3">
            <label className="form-label">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="test"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Surname
            </label>
            <input
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              type="test"
              className="form-control"
            />
          </div>

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
              Register
            </Button>
          </div>
        </form>

        <Alert
          className='mt-3' show={error} onClose={() => setError('')}
        >
          {error}
        </Alert>
      </div>
    </div>
  )
}
