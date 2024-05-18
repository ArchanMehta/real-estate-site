import expressAsyncHandler from "express-async-handler";

import {prisma} from "../config/prismaconfig.js"

export const createResidency = expressAsyncHandler(async(req,res) => {
   

    const {title,description,price,address,city,country,image,facilities,userEmail} = req.body.data;


    console.log(req.body.data)
    try{
        const residency  = await prisma.residency.create({
            data : {title,
                description,
                price,
                address,
                city,
                country,
                image,
                facilities,
                owner:{connect :{email:userEmail}},
        },
        });

        res.send({message:"Residency Created Successfully",residency})

    }catch(err){
        if(err.code === "P2002"){
            throw new Error("A residency with the address already there");
        }throw new Error(err.message)
    }


})


export const getallresd = expressAsyncHandler(async(req,res) => {
    const residencies = await prisma.residency.findMany({

        orderBy:{
            updatedAt:"desc"
        }
    })
    res.send(residencies);
})


export const getresd = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
    const residency = await prisma.residency.findUnique({
        where: { id },
      });
      res.send(residency);
    } catch (err) {
      throw new Error(err.message);
    }
  });