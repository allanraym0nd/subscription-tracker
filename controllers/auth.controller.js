import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import User from "../models.js/user.model.js"
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js"

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession() // not user session, its a session of a mongoose transaction

    try {
        session.startTransaction()
        // lets create a new user
        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            const error = new Error('User already exists')
            error.statusCode = 409
            throw error

        }

        // Hash Password - so we dont store password as plaintext
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUsers = await User.create([{ name, email, password: hashedPassword }], { session }) // for abort or commit transaction(session)
        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
        await session.commitTransaction()
        session.endSession()
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUsers[0]

            }
        })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }


}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            const error = new Error("Invalid Password")
            error.statusCode = 404
            throw error

        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

        res.status(200).json({
            success: true,
            message: 'User Signed In Successfully',
            data: {
                token,
                user

            }
        })
    } catch (error) {
        next(error)
    }



}

export const signOut = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: "User signed-out succesfully"
        })

    } catch (error) {
        next(error)

    }



}