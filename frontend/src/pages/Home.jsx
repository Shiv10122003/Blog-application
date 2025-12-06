import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { allBlogs, deleteBlog } from '../api/api';
import BlogCard from '../components/BlogCard.jsx';
import {toast} from 'react-hot-toast';
function Home() {
    const [blogs,setBlogs] = useState([]);
    const[loading,setLoading] = useState(true);
    const[error,setError] = useState(null); 
    const navigate = useNavigate();
    
    useEffect(()=>{
         const token = localStorage.getItem('token');
        if(!token){
            navigate('/login');
            return;
        }
         fetchBlogs();
     }, [navigate]);
   const  fetchBlogs = async()=>{
         try{
            const response = await allBlogs();
            setBlogs(response.data.data);
            console.log(response.data);
         } catch (error) {
            setError(error.message);
         } finally{
            setLoading(false);
         }
   }
   const blogDelete = async(blogId)=>{
    try{
        if(!window.confirm('Are you sure?')){
            return;
        }
     const token = localStorage.getItem('token');
     if(!token){
        toast.error('Please login first!');
        navigate('/login');
        return;
     }
     await deleteBlog(blogId,token);
     setBlogs(blogs.filter(blog => blog._id!==blogId));
     toast.success('Blog deleted successfully');
      
    }
    catch(error){
    setError(error.message);
    }
   }
   return(
      <div className='min-h-screen bg-gray-50'>
         <Navbar />
        
         <div className="min-h-screen bg-black p-6">
            <h1 className="text-4xl font-bold text-center mb-8 text-white">All Blogs</h1>
        
         <div className='mt-5 mb-10'>
         <button className='rounded-xl bg-blue-600 text-white px-7 py-3 hover:bg-blue-800 hover:scale-105 active:scale-95' onClick={()=>{
            navigate('/create-blog')
         }}>✚ Create Blogs</button>
         </div>

            {loading && <p className="text-center text-gray-500">Loading blogs...</p>}
            {error && <p className="text-center text-red-500">Error: {error}</p>}
            {/* No Blogs State */}
            {!loading && !error && blogs.length === 0 && (
            <div className="text-center py-16">
                        <p className="text-gray-400 text-xl mb-4">No blogs found</p>
                        <button 
                            onClick={() => navigate('/create-blog')}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
                        >
                            Create Your First Blog
                        </button>
                    </div>
            )}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {!loading && !error && blogs.length > 0 && blogs.map((blog) => (
                        <BlogCard 
                            key={blog._id}
                            id={blog._id}
                            blog={blog}
                            onDelete={blogDelete}
                        />
                    ))}
                </div>
         </div>
      </div>
   )
}

export default Home;