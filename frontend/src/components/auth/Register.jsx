import React, { useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    setPicLoading(true);
    if (!name || !email || !password || !passwordConfirmation) {
      toast({
        title: 'Please fill the fields',
        status: 'warning',
        duration: 2500,
        isClosable: true,
        position: 'top'
      });
      setPicLoading(false);
      return;
    }
    if (password !== passwordConfirmation) {
      toast({
        title: 'The Passwords Do Not Match',
        status: 'warning',
        duration: 2500,
        isClosable: true,
        position: 'top'
      });
      return;
    }
    try {
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      };
      const { data } = await axios.post(
        '/api/user',
        {
          name,
          email,
          password,
          profilePic
        },
        config
      );
      console.log(data);
      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setPicLoading(false);
      navigate('/chats');
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
      setPicLoading(false);
    }
  };

  const handleClick = () => setShowPassword(!showPassword);

  const postDetails = pics => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: 'Choose an image',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'top'
      });
      return;
    }
    console.log(pics);
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'instant-messenger');
      data.append('cloud_name', 'dtzxj2g2g');
      fetch('https://api.cloudinary.com/v1_1/dtzxj2g2g/image/upload', {
        method: 'post',
        body: data
      })
        .then(res => res.json())
        .then(data => {
          setProfilePic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch(err => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: 'Choose an image',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'top'
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <div>
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <h3 className="text-2xl font-bold sm:text-3xl">Get started today!</h3>
        </div>

        <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4">
          <div>
            <label htmlFor="text" className="sr-only">
              Name
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full p-4 pr-12 text-sm rounded-lg shadow-sm border-2 border-solid border-black"
                placeholder="Enter name"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full p-4 pr-12 text-sm rounded-lg shadow-sm border-2 border-solid border-black"
                placeholder="Enter email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <span className="absolute inset-y-0 inline-flex items-center right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full p-4 pr-12 text-sm rounded-lg shadow-sm border-2 border-solid border-black"
                placeholder="Enter password"
                id="password"
                autoComplete="on"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              <span
                className="absolute inset-y-0 inline-flex items-center right-4 cursor-pointer"
                onClick={handleClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Cofirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full p-4 pr-12 text-sm rounded-lg shadow-sm border-2 border-solid border-black"
                placeholder="Confirm password"
                id="passwordConfirmation"
                autoComplete="on"
                value={passwordConfirmation}
                onChange={e => setPasswordConfirmation(e.target.value)}
              />

              <span
                className="absolute inset-y-0 inline-flex items-center right-4 cursor-pointer"
                onClick={handleClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Upload picture
            </label>
            <div className="relative">
              <input
                type="file"
                className="w-full p-4 pr-12 text-sm rounded-lg shadow-sm border-2 border-solid border-black cursor-pointer"
                placeholder="Upload picture"
                onChange={e => postDetails(e.target.files[0])}
              />
            </div>
          </div>
        </form>

        <button
          className="flex mt-10 items-center justify-center px-8 py-4 font-bold transition bg-white border-4 border-black rounded-xl focus:outline-none focus:ring shadow-[6px_6px_0_0_#000] hover:shadow-none active:bg-pink-200"
          type="submit"
          onClick={handleSubmit}
        >
          Register
          <span aria-hidden="true" className="ml-1.5" role="img">
            Now
          </span>
        </button>
      </div>
    </div>
  );
}

export default Register;
