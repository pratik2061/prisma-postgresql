import prisma from "../DB/db.config.js";

//show all users
export const fetchComments= async (req,res)=>{
    const comments = await prisma.comment.findMany({
        include:{
            user:true,
            post:{
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
  return res.json({status:200, data:comments})
}

export const createComment = async (req, res) => {
    const {user_id,post_id,comment} = req.body;

    //Increase the comment_count;by default its value is 0 we have to increment here.
    await prisma.post.update({
        where:{
            id:Number(post_id),
        },
        data:{
            comment_count:{
                increment:1
            }
        },
    })

    const newComment = await prisma.comment.create({ 
        data: {
            user_id:Number(user_id),
            post_id:Number(post_id),
            comment:comment,
        },
    });
    return res.json({
        status: 200,
        data: newComment,
        message: "comment created succesfully!",
    });
};

//updating the comment
export const updateComment = async (req, res) => {
    const commentId = req.params.id;
    const { user_id,post_id,comment } = req.body;

    await prisma.comment.update({
        where: {
            post_id: Number(commentId),
        },
        data: {
            user_id:Number(user_id),
            post_id:Number(post_id),
            comment:comment,
        },
    });
    return res.json({
        status: 200,
        msg: "Updated comment sucessfully!",
    });
};


//show single comment
export const showComment =async (req,res)=>{
    const commentId = req.params.id
    const comment = await prisma.comment.findFirst({
        where:{
            id:Number(commentId)
        }
    })
    return res.json({
        status: 200,
        data: comment
    });
}

//delete comment

export const deleteComment = async (req,res)=>{
    const commentId = req.params.id
        //decrease the comment_count;
        await prisma.post.update({
            where:{
                id:Number(post_id),
            },
            data:{
                comment_count:{
                    decrement:1
                }
            },
        })
    await prisma.comment.delete({
        where:{
            id:Number(commentId)
        }
    })
    return res.json({
        status:200,
        msg:"comment deleted successfully"
    })
}