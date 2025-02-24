const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/',(req,res)=>{
//     res.send("Hello World")
// })
app.use('/api',require('./routes/index'))
const PORT = process.env.PORT || 5000
console.log("Server Running.....")
app.listen(PORT, () => console.log(`Server running on port ${PORT}....`))
