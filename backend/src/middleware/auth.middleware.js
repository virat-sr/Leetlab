import jwt from 'jsonwebtoken'
import { db } from '../libs/db.js'


export const authMiddleware = async(req, res, next) => {
    //checks if we are logged in 
    try {
        const token = req.cookies.jwt

        if(!token) {
            res.status(401).json({
                message:"Unautherized - No token provided."
            })
        }
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            res.status(401).json({
                message:"Unauth - Invalid token"
            })
        }

        const user = await db.user.findUnique({
            where:{
                id: decoded.id
            },
            select:{
                id:true,
                image:true,
                name:true,
                email:true,
                role:true,
            }
        })


        if (!user) {
            return res.status(404).json({
                message:"User not found."
            })
        }

        res.user = user
        next()
    } catch (error) {
        console.log('Error authenticating uer',error)
        res.status(500).json({
            message:"Error authenticating user."
        })
        
    }
}