const express=require('express')
const {Router}=require('express')
const login_router=Router()
const {PrismaClient}=require('@prisma/client')
const loginUser = require('../controllers/authController')
const prisma=new PrismaClient()

login_router.post('/login',async(req,res)=>{
    console.log("Inside the Login")
    const {userId,password}=req.body
    try {
        // let storeUserData=await prisma.user.create({
        //     data:{
        //         name:"Anand",
        //         email:userId,
        //         password:password
        //     }
        // })
        // console.log(storeUserData)
        const response=await loginUser(userId, password)
        return res.status(200).json({message:"Login Data Stored Successfully"})
    } catch (error) {
        console.log(error,"Error While Login Data")
        return res.status(400).json({message:error.message});
    }
})

module.exports=login_router