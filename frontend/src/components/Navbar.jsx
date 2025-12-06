import React from 'react'

function Header(){
  
  return (
    <>
    <div className='flex   bg-gray-900 border-b border-gray-700 p-4 items-center justify-between'>
      <div className='bg-gray-900  p-4 flex items-center justify-center '>
        <h1 className='text-3xl font-bold text-white mb-2'>My Blog</h1>
      </div>
      <div className='flex items-center justify-center mt-4 gap-10 text-white'>
        <a href="/home">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
      </div>
    </>
  )
}

export default Header;