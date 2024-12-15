import 'dotenv/config';


import express from 'express'

const app = express()

const PORT = process.send.PORT || 3000


//middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.get("/",(req,res)=>{
    return res.send("hi everyone");
})

//ROute file
import routes from './route/index.js'
app.use(routes);

app.listen(PORT, ()=>console.log("server is running"))