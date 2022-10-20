import { PrismaClient } from "@prisma/client";
import  Express  from "express";
import cors from 'cors';
import bodyParser from "body-parser";


const app = Express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());

const prisma = new PrismaClient()


//simple get api for collecting all data
app.get('/api',async (req,res)=>{
    const users = await prisma.user.findMany();
    res.json(users);
   

})

// api for creating new user
app.post('/api',async (req,res)=>{
    await prisma.user.create({data : {name :req.body.name,
    email : req.body.email}});
    res.redirect('http://localhost:5173/')

})

//api for deleting a user
app.get('/api/delete/:id',async (req,res)=>{
    const id = parseInt(req.params.id);
    await prisma.user.delete({where:{id:id}})
    res.redirect('http://localhost:5173/')

})
res.redirect('http://localhost:5173/')
//api for getting a user for particular id
app.get('/api/:id',async (req,res)=>{
    const id = parseInt(req.params.id);
    const get_user = await prisma.user.findFirst({where:{id:id}})
    res.json(get_user)
})

// api for updating a given user
app.post('/api/:id',async (req,res)=>{
    await prisma.user.update(
        {
            where:{
                id:parseInt(req.body.id)
            },
            data:{
                name:req.body.name,
                email:req.body.email
            }
        }
    )
    res.redirect('http://localhost:5173/')
})

app.listen(5000);








