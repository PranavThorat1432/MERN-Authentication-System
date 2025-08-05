import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  // React Router navigation hook
  const navigate = useNavigate();

  // Get context values for backend URL, login state, and user data fetcher
  const { backendURL, setIsLoggedIn, getUserData } = useContext(AppContext);

  // Local state for form mode, input fields
  const [state, setState] = React.useState('LogIn'); // 'LogIn' or 'Sign Up'
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false); // New state for password visibility

  // Handle form submission for login or signup
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true; // Send cookies with requests

      if (state === 'Sign Up') {
        // Registration request
        const { data } = await axios.post(backendURL + '/api/user/register', { name, email, password });

        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        // Login request
        const { data } = await axios.post(backendURL + '/api/user/login', { email, password });

        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      {/* Logo, navigates to home on click */}
      <img onClick={() => navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />

      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
        {/* Title and subtitle */}
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state === 'Sign Up' ? 'Create Account' : 'LogIn'}</h2>
        <p className='text-center text-sm mb-6'>{state === 'Sign Up' ? 'Create Your Account' : 'LogIn to Your Account'}</p>

        {/* Login/Signup form */}
        <form onSubmit={onSubmitHandler}>
          {/* Name input for Sign Up */}
          {state === 'Sign Up' && (
            <div className='mb-4 items-center flex gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
              <img src={assets.person_icon} alt="" />
              <input
                onChange={e => setName(e.target.value)}
                value={name}
                className='bg-transparent outline-none text-white'
                type="text"
                placeholder='Full Name'
                required
              />
            </div>
          )}

          {/* Email input */}
          <div className='mb-4 items-center flex gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              className='bg-transparent outline-none text-white w-full'
              type="email"
              placeholder='Email'
              required
            />
          </div>

          {/* Password input with show/hide toggle */}
          <div className='mb-4 items-center flex gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={e => setPassword(e.target.value)}
              value={password}
              className='bg-transparent outline-none text-white w-full'
              type={showPassword ? "text" : "password"}
              placeholder='Password'
              required
            />
            {/* Eye icon to toggle password visibility */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className='text-indigo-400 hover:text-indigo-300 transition-colors'
            >
              {showPassword ? (
                // Eye slash icon (hide password)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                // Eye icon (show password)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Forgot password link */}
          <p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>Forgot Password?</p>

          {/* Submit button */}
          <button className='w-full py-2.5 rounded-full cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>{state}</button>
        </form>

        {/* Toggle between Login and Sign Up */}
        {state === 'Sign Up' ? (
          <p className='text-center text-sm text-gray-400 mt-4'>
            Already have an account?{' '}
            <span onClick={() => setState('Login')} className='text-blue-400 cursor-pointer underline'>Login here</span>
          </p>
        ) : (
          <p className='text-center text-sm text-gray-400 mt-4'>
            Don't have an account?{' '}
            <span onClick={() => setState('Sign Up')} className='text-blue-400 cursor-pointer underline'>Sign up</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default Login
