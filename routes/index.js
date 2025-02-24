const {Router}=require('express')

const router=Router()

router.use('/users',require("./users.js"))

module.exports=router