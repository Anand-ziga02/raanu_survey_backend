const {Router}=require('express')

const router=Router()

router.use('/users',require("./users.js"))
router.use('/auth',require('./auth.js'))
router.use('/survey',require('./survey.js'))

module.exports=router