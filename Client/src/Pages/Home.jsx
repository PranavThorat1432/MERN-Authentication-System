import React from 'react'
import Navbar from '../MyComponents/Navbar.jsx'
import Header from '../MyComponents/Header.jsx'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
      <Navbar/>

      <Header/>
    </div>
  )
}

export default Home
