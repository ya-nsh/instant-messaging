import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleClick = () => setShowPassword(!showPassword);
  const handleGuest = () => {
    setEmail('guest@messenger.com');
    setPassword('guest');
  };
  return (
    <div>
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <h3 className="text-2xl font-bold sm:text-3xl">Welcome back!</h3>
        </div>

        <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4">
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
            <label htmlFor="email" className="sr-only">
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
        </form>
        <button
          className="flex mt-10 items-center justify-center px-8 p-4 font-bold transition bg-white border-4 border-black rounded-xl focus:outline-none focus:ring   hover:shadow-xl hover:ring-xl hover:scale-110 "
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </button>
        <button
          className="mt-10 p-4 inline-block px-4 text-black transition bg-white hover:scale-110 font-bold hover:shadow-xl rounded-xl border-4 border-black focus:outline-0 focus:ring active:bg-black active:text-white active:outline-0"
          onClick={handleGuest}
        >
          Guest User
        </button>
      </div>
    </div>
  );
}

export default Login;
