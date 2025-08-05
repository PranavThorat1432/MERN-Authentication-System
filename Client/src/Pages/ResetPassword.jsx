import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {

  // Get backend URL from context
  const {backendURL} = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const Navigate = useNavigate();

  // State variables for form fields and UI flow
  const [email, setEmail] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [isEmailSent, setIsEmailSent] = React.useState(false)
  const [otp, setOtp] = React.useState('')
  const [isOtpSubmitted, setIsOtpSubmitted] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)

  // Ref for OTP input fields
  const inputRefs = React.useRef([])
  
  // Handle input in OTP fields: move to next field on input
  const handleInput = (e, index) => {
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  // Handle backspace in OTP fields: move to previous field if empty
  const handleKeyDown = (e, index) => {
    if(e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  // Handle paste event for OTP fields
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('')
    pasteArray.forEach((char, index) => {
      if(inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    })
  }

  // Submit email to request OTP
  const onSubmitEmail = async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post(backendURL + '/api/user/send-reset-otp', {email});
      data.success ? toast.success(data.message) : toast.error(data.error)
      data.success && setIsEmailSent(true)

    } catch (error) {
      toast.error(error.message)
    }
  }

  // Submit OTP entered by user
  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value);
    const otpValue = otpArray.join('');
    
    if (otpValue.length !== 6) {
      toast.error('Please enter the 6-digit OTP');
      return;
    }

    // Set OTP state
    setOtp(otpValue);

    // Move to new password form after a slight delay
    setTimeout(() => {
      setIsOtpSubmitted(true);
    }, 100);
  };

  // Submit new password along with email and OTP
  const onSubmitNewPasword = async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post(backendURL + '/api/user/reset-password', {email, otp, newPassword});
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && Navigate('/login')
    } catch (error) {
      toast.error(error.message)          
    }
  }

  // Debug: log OTP submission state
  useEffect(() => {
    console.log("isOtpSubmitted:", isOtpSubmitted)
  }, [isOtpSubmitted])


  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      {/* Logo, navigates to home */}
      <img onClick={() => Navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>

      {/* Step 1: Enter email */}
      {!isEmailSent && 
        <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
          <p className='text-center mb-6 text-indigo-300'>Enter your registered email address</p>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="" />
            <input type="email" placeholder='Email' className='bg-transparent outline-none text-white' value={email} onChange={e => setEmail(e.target.value)} required/>
          </div>

          <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white cursor-pointer rounded-full mt-3'>Submit</button>
        </form>
      }

      {/* Step 2: Enter OTP */}
      {!isOtpSubmitted && isEmailSent &&
        <form onSubmit={onSubmitOtp} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
          <p className='text-center mb-6 text-indigo-300'>Enter 6-digit code send to your email id.</p>

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

            <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white cursor-pointer rounded-full'>Submit</button>
        </form>
      }

      {/* Step 3: Enter new password */}
      {isOtpSubmitted && isEmailSent && 
        <form onSubmit={onSubmitNewPasword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
          <p className='text-center mb-6 text-indigo-300'>Enter the new password below</p>

          {/* Password input with show/hide toggle */}
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder='Password' 
              className='bg-transparent outline-none text-white w-full' 
              value={newPassword} 
              onChange={e => setNewPassword(e.target.value)} 
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

          <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white cursor-pointer rounded-full mt-3'>Submit</button>
        </form>
      }

    </div>
  )
}

export default ResetPassword
