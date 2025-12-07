import axios from 'axios'

const API_URL = 'https://blog-application-1-ji0j.onrender.com/api/'

export const registerUser = async (userData)=>{
    return await axios.post(`${API_URL}auth/register`,userData);
}

export const LoginUser = async (userData)=>{
    return await axios.post(`${API_URL}auth/login`,userData);
}
 
// All the Blog 
export const allBlogs = async ()=>{
    return await axios.get(`${API_URL}blog`);
}

//Create Blog
export const createBlog = async (blogData,token)=>{
    return await axios.post(`${API_URL}blog/create`,blogData,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}

// Update Blog
export const updateBlog = async (blogId, blogData, token)=>{
    return await axios.put(`${API_URL}blog/${blogId}`, blogData,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}
//delete api
export const deleteBlog = async(blogId,token)=>{
 return await axios.delete(`${API_URL}blog/${blogId}`,{
    headers:{
        Authorization: `Bearer ${token}`
    }
})
}

export const getBlogById = async(blogId)=>{
    return await axios.get(`${API_URL}blog/${blogId}`);
}
