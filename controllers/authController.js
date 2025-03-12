const {PrismaClient}=require('@prisma/client')

const prisma=new PrismaClient()

async function loginUser(userId,password){
    try {
        console.log("Inside the Login Controller")
        const user=await prisma.user.findUnique({
            where:{
                email:userId
            }
        })
        if(!user){
            throw new Error("User not Found")
        }
        let existing_password=user.password
        console.log(existing_password,"========OLD PASSWORD=========")
        if(password!==existing_password){
            throw new Error("Invalid Credential")
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports=loginUser