import bcrypt from 'bcryptjs'
import {db} from "../libs/db.js"
import { UserRole } from '../generated/prisma/index.js'
import jwt from "jsonwebtoken"


export const register = async (req, res) =>{

    const {email, password, name} = req.body
    console.log(email, password, name)

    try {
        const existingUser = await db.user.findUnique({
            where: {email}
        })

        if (existingUser) {
            return res.status(400).json({
                error: "User already exists."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10) 

        const newUser = await db.user.create({
            data: {
                email,
                password:hashedPassword,
                name,
                role:UserRole.USER
            }
        })


        const token = jwt.sign({id:newUser.id}, process.env.JWT_SECRET, {
            expiresIn:"7d"
        })

        res.cookie("jwt", token , {
            httpOnly:true,
            sameSite:"strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            success: true,
            message: "User created successfully.",
            user:{
                id:newUser.id,
                email:newUser.email,
                name: newUser.name,
                role: newUser.role,
                image: newUser.image
            }
        })




    } catch (error) {
        console.log("Error while creating a user.",error)
        res.json(500).json({
            error:"Error creating a user."
        })
        
    }
    
}
export const login = async (req, res) =>{
    
    const {email, password} = req.body

    try {
        const user = await db.user.findUnique({
            where : {
                email
            }
        })

        if (!user) {
            return res.status(401).json({
                error:"User not found."
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({
                error:"Invalid Credentials."
            })
        }

        const token  = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET,{
                expiresIn:"7d"
            }
        )

        res.cookie("jwt", token ,{
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000*60*60*24*7
        })

        res.status(201).json({
            success: true,
            message: "User Logged in successfully.",
            user: {
                id : user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                image: user.image
            }
        })
        
    } catch (error) {
        console.log('Error creating user',error)
        res.status(500).json({
            error : "Error logging user."
        })
    }
}
export const logout = async (req, res) =>{
    try {
         res.clearCookie("jwt" , {
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "development",
        })

        res.status(200).json({
            success: true,
            message:"Useer logged out succesfully."
        })
    } catch (error) {
        console.log('Error logging out',error)
    }
    
}
export const check = async (req, res) => {
    try {
        res.status(200).json({
            success:true,
            message: "User authenticated successfully."
        })
    } catch (error) {
        console.log('error.')
        
    }
    
}