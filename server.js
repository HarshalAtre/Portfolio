const express=require('express')
const app=express()
const port=process.env.PORT || 5000
const dbconfig=require('./config/dbconfig')
const cors=require('cors')
const portfolioRoute=require('./routes/portfolioRoutes')
app.use(cors())
app.use(express.json())

app.use('/portfolio',portfolioRoute)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}` )
})