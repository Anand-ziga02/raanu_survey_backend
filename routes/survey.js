const express = require('express')
const { Router } = require('express')
const survey_router = Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

survey_router.post('/', async function (req, res) {
    const { surveyId, questions,email } = req.body
    console.log(surveyId,"Survey_ID")
    console.log(questions,"Questions===============")
    console.log(email,"==================EMAIL====================")
    console.log(req.body,"Survey from Frontend")
    try {
        const getUser = await prisma.user.findFirst({
            where:{
                email
            }
        })
        console.log(getUser,"Survey Response")
        if(!getUser){
            return res.status(400).json({message:"User not found"})
        }
        const updateQuestions=await prisma.user.update({
            where:{
                id:getUser.id,
            },
            data:{
                survey_id:surveyId,
                questions:questions
            }
        })
        console.log(updateQuestions,"Survey Response")
        return res.status(200).json({ message: "Survey stored successfully",response:updateQuestions })
    } catch (error) {
        return res.status(400).json({
            message: "Error while updating survey",
            error: error.message
        })
    }
})
survey_router.get('/',async(req,res)=>{
    const {surveyId} = req.query
    console.log(surveyId,"=====================SURVEY ID=====================")
  try {
    const getSurvey=await prisma.user.findFirst({
        where:{
            survey_id:surveyId
        }
    })
    console.log(getSurvey,"Fetched survey Questions")
    return res.status(200).json({message:getSurvey})
  } catch (error) {
    return res.status(400).json
    ({  
        message:"Error fetching survey",
        error:error.message
    })
  }
})
module.exports=survey_router