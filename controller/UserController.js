import prisma from "../DB/db.config.js";

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const findUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (findUser) {
        return res.json({
            status: 400,
            message: "Email Alredy Taken.Try another Email",
        });
    }

    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password,
        },
    });
    return res.json({
        status: 200,
        data: newUser,
        message: "User created succesfully!",
    });
};

//updating the user
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    await prisma.user.update({
        where: {
            id: Number(userId),
        },
        data: {
            name: name,
            email: email,
            password: password,
        },
    });
    return res.json({
        status: 200,
        msg: "Updated user sucessfully!",
    });
};

//show all users
export const fetchUser= async (req,res)=>{
    const users = await prisma.user.findMany({})
  return res.json({status:200, data:users})
}
//show single user
export const showUser =async (req,res)=>{
    const userId = req.params.id
    const user = await prisma.user.findFirst({
        where:{
            id:Number(userId)
        }
    })
    return res.json({
        status: 200,
        data:user
    });
}

//delete user 
export const deleteUser = async (req,res)=>{
    const userId = req.params.id
    await prisma.user.delete({
        where:{
            id:Number(userId)
        }
    })
    return res.json({
        status:200,
        msg:"deleted successfully"
    })
}