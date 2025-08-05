import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { AppContext } from '../Context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const VerifyEmail = () => {

  // Ensure cookies are sent with requests
  axios.defaults.withCredentials = true;
  const {backendURL, isLoggedIn, userData, getUserData} = useContext(AppContext);

  const navigate = useNavigate();

  // Ref to hold input elements for OTP
  const inputRefs = React.useRef([])

  // Move focus to next input on input
  const handleInput = (e, index) => {
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  // Move focus to previous input on backspace if empty
  const handleKeyDown = (e, index) => {
    if(e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  // Handle pasting OTP into inputs
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('')
    pasteArray.forEach((char, index) => {
      if(inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    })
  }

  // Handle OTP form submission
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      // Collect OTP from inputs
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      // Send OTP to backend for verification
      const {data} = await axios.post(backendURL + '/api/user/verify-account', {otp})

      if(data.success) {
        toast.success(data.message);
        getUserData() // Refresh user data
        navigate('/') // Redirect to home
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // If already logged in and verified, redirect to home
  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate('/')
  }, [isLoggedIn, userData])

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
        {/* Logo */}
        <img onClick={() => navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>

        {/* OTP Verification Form */}
        <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
            <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
            <p className='text-center mb-6 text-indigo-300'>Enter 6-digit code send to your email id.</p>

            {/* OTP Inputs */}
            <div className='flex justify-between mb-8' onPaste={handlePaste}>
                {Array(6).fill(0).map((_, index) => (
                    <input
                      type="text"
                      maxLength='1'
                      key={index}
                      required
                      className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
                      ref={e => inputRefs.current[index] = e}
                      onInput={(e) => handleInput(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                ))}
            </div>

            {/* Submit Button */}
            <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white cursor-pointer rounded-full'>Verify Email</button>
        </form>
    </div>
  )
}

export default VerifyEmail
