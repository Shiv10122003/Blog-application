import Blog  from '../model/Blog.js'
export const getBlogById = async(req,res)=>{
  try{
    const blog = await Blog.findById(req.params.id);
    if(!blog){
      return res.status(404).json({
        success:false,
        message:"Blog not found"
      })
    }
    res.status(200).json({
     success:true,
     message:"Blog found successfully",
     data:blog
    })
  }
  catch(error){
   res.status(500).json({
    success:false,
    message:"Server Error",
    error:error.message
   });
  }
}
export const getAllBlogs = async (req,res)=>{
    try{
       const blogs = await Blog.find().sort({createdAt: -1});
       
       res.status(200).json({
           success: true,
           count: blogs.length,
           data:blogs
        })
    }
    catch(error){
        console.error("Get all blogs error:",error);
        res.status(500).json({
           success:false,
           message:"Server error",
           error: error.message  
        }
        );
    }
};

export const createBlog = async (req,res)=>{
    try{
         const{ title,content } = req.body;
       
         if(!title || !content){
            return res.status(400).json({
              success:false,
              message:"All fields are required (title,content,username)"
            } );
         }
         const username= req.user.name;
         console.log(username);
         
         const blog = await Blog.create({
          title,
          content,
          username
         });

         res.status(201).json({
            success: true,
            message:"Blog created successfully",
            data: blog
         });
         
    }
    catch(error){
        console.error("Create blog error:",error);
        res.status(500).json({
            success: false,
            message:"Server error",
            error:error.message
    });
}
};

export const updateBlog = async (req,res)=>{
try{
  const{title,content} = req.body;
  const blog = await Blog.findById(req.params.id);
  if(!blog){
    return res.status(404).json({
         success: false,
         message:"Blog not found"
    });
  }
  if(title) blog.title = title;
  if(content) blog.content=content; 
   await blog.save();
  return res.status(200).json({
    success: true,
    message:"Blogs updated successfully",
    data: blog
  })
}
catch(error){
  console.error("Update blog error",error);
  res.status(500).json({
      success:false,
      message:"Server error",
      error:error.message
  });
}
}

export const deleteBlog = async (req,res)=>{
 try{
  const blog =  await Blog.findById(req.params.id);
  if(!blog){
    return res.status(400).json({
    success: false,
    message:"Blog not found",
    error:error.message
    });

  }
  await blog.deleteOne();
   res.status(200).json({
     success: true,
     message:"Blog deleted successfully"
   });
 }  
catch(error){
    console.error("Delete blog error",error);
    res.status(500).json({
      success:false,
      message:"Server error",
      error:error.message
    });
}
}