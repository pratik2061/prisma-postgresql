import prisma from "../DB/db.config.js";

//show all users
export const fetchPost= async (req,res)=>{
    const posts = await prisma.post.findMany({
        include:{
            comment:{
                include:{
                    user:{
                        select:{
                            name:true
                        }
                    }
                }
            }
        }
    })
  return res.json({status:200, data:posts})
}

export const createPost = async (req, res) => {
    const {user_id,title,description} = req.body;

    const newPost = await prisma.post.create({
        data: {
            user_id:Number(user_id),
            title:title,
            description:description
        },
    });
    return res.json({
        status: 200,
        data: newPost,
        message: "Post created succesfully!",
    });
};

//updating the user
export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { user_id,title,description } = req.body;

    await prisma.post.update({
        where: {
            id: Number(postId),
        },
        data: {
            title:title,
            description:description
        },
    });
    return res.json({
        status: 200,
        msg: "Updated Post sucessfully!",
    });
};


//show single user
export const showPost =async (req,res)=>{
    const postId = req.params.id
    const post = await prisma.post.findFirst({
        where:{
            id:Number(postId)
        }
    })
    return res.json({
        status: 200,
        data: post
    });
}

//delete user 
export const deletePost = async (req,res)=>{
    const postId = req.params.id
    await prisma.post.delete({
        where:{
            id:Number(postId)
        }
    })
    return res.json({
        status:200,
        msg:"Post deleted successfully"
    })
}