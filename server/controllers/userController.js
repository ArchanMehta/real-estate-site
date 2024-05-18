import asynHandler from "express-async-handler"
import cors from "cors";
import { Prisma } from "@prisma/client"
import { prisma } from "../config/prismaconfig.js";
import expressAsyncHandler from "express-async-handler";

cors();

export const createUser = asynHandler(async (req , res ) => {
    console.log("Creating a user ...");

    let {email} = req.body;
    console.log(email);
        const userExists = await prisma.user.findUnique({ where : { email: email}});
if (!userExists) {
    const user = await prisma.user.create({data:req.body});
    
    res.send({
        message : "User Registered Successfully",
        user : user,
    });

} else res.status(201).send({ message: "User already registered !!!"});
});


export const bookvisit = expressAsyncHandler(async(req,res) => {

    const {email,date} = req.body;
    const {id} = req.params;

    try{
        const alreadybooked = await prisma.user.findUnique({
            where:{email},
            select: {bookedVisits:true}

        })

        if(alreadybooked.bookedVisits.some((visits) => visits.id === id)){
            res.status(400).json({message:"The residency is already booked by you!!"})
        }

        else{
            await prisma.user.update({
                where :{email:email},
                data:
                {
                    bookedVisits:{push:{id,date}}
                }
            })
            res.send("Booked Successfully.")
        }

    }catch(err){
        throw new Error (res.message)
    }

})



export const getallbookings = expressAsyncHandler( async (req,res) => {

    const {email} = req.body;

    try{
        const booking = await prisma.user.findUnique({
            where: {email},
            select:{bookedVisits:true}

        })
        res.status(200).send(booking)
    }catch(err){

        throw new Error (res.message)
    }


})


export const cancelbooking = expressAsyncHandler(async(req,res) => {
    const {email} = req.body;
    const {id} = req.params;

    try{
        const user = await prisma.user.findUnique({
            where : {email},
            select:{bookedVisits : true}
        })


        const index =user.bookedVisits.findIndex((visits) => visits.id === id)

        if (index === -1){
            res.status(404).json({message:"Booking does not exists"})
        }else{
            user.bookedVisits.splice(index,1);
            await prisma.user.update({
                where:{email},
                data:{
                    bookedVisits:user.bookedVisits,
                },
            })
            res.send("Booking Canceled Successfully !!!")
        }


    }catch(err){
        throw new Error (err.message);
    }
})


export const tofav = expressAsyncHandler(async(req,res) => {
    const {email} = req.body ;
    const {rid} = req.params ;

    try{

        const user = await prisma.user.findUnique({
            where:{email},

        })

        if(user.favResidenciesID.includes(rid)){

            const updateuser = await prisma.user.update({
                where:{email},
                data:{
                    favResidenciesID:{
                        set:user.favResidenciesID.filter((id) => id !== rid)
                    }
                }
            })

            res.send({message:"Removed from favorite.",user:updateuser})


        }else{
            const updateuser = await prisma.user.update({
                where:{email},
                data:{
                    favResidenciesID:{
                        push:rid
                    }
                }
            })

            res.send({message:"Favorites Added.",user:updateuser})
        }


    }catch(err){

        throw new Error (err.message)
    }
})


export const getallfavs = expressAsyncHandler(async(req,res) =>{
    const {email}=req.body;

    try{
        const favresd = await prisma.user.findUnique({
            where:{email},
            select:{
                favResidenciesID:true
            }
        })
        res.status(200).send(favresd)

    }catch(err){
        throw new Error (err.message)
    }






})