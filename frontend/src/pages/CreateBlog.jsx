import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'
import { createBlog } from '../api/api';
function CreateBlog() {
  const [error,setError] = useState(null);
  const [title,setTitle] = useState();
  const [content,setContent] = useState();
  const navigate = useNavigate();

  const handleCreate= async()=>{
    try{
      const token = localStorage.getItem('token');
      if(!token){
        setError('User not authenticated');
        navigate('/login');
      }
     await createBlog({title,content},token);
     toast.success('Blog created successfully');
     navigate('/home');
    }
    catch(error){
      setError(error.message);
    }
  }
  return (
    
    <div className='min-h-screen bg-black flex items-center justify-center '>
      
    <div className='max-w-2xl w-full bg-gray-900 mx-auto p-8 rounded-2xl'>
      {/* //header */}
      <div className='mb-12'>
        <h1 className='text-white text-3xl font-bold text-center'>Create Blogs</h1>
        <p className='text-white py-2 text-center'>✨ Create your own vibes</p>
      </div>
      {/* Content */}
      <div className='mb-6'>
       <label className='block text-xl font-bold text-white py-2' htmlFor="title">
        📝 Title
      </label>
      <input
       type="text"
       className='bg-gray-800 px-3 py-2 w-full mt-4 font-bold rounded text-white placeholder-gray-500'
       placeholder='Enter the Title...'
       onChange={(e)=>{
        setTitle(e.target.value);
       }}
       />
      </div>
       <div className='mb-10'>
       <label className='block text-xl font-bold text-white  py-2' htmlFor="content">
        📝 Content
      </label>
      <textarea 
      name="content" 
      id="content" 
      className='w-full mt-4 bg-gray-800 resize-none rounded h-40 text-white placeholder-gray-500 font-bold p-4'
      onChange={(e)=>{
        setContent(e.target.value);
      }}
      placeholder='Enter  the  content..'
      />
      </div>

      <div className='mb-6 flex justify-between'>
      <button className='bg-green-600 py-2 px-4 rounded-lg text-white text-xl' onClick={handleCreate}>
      Create Blogs
      </button>
      <button className='bg-red-600 py-2 px-4 rounded-lg text-white text-xl'
      onClick={()=>{
        navigate('/home');
      }}>
     ❌ Cancel
      </button>
      
      </div>
    </div>
  
    </div> 
  )
}

export default CreateBlog