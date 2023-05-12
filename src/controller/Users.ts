const { Users } = require("../models")
import express, { Request, Response, RequestHandler } from "express"
import { createToken, validateToken } from "../middleware/JWT"
import bcrypt from "bcrypt"


export const registerUser = async (req: Request, res: Response) => {
    try {
        let { user } = req.body
        const find_user = await Users.findOne({
            where: {
                email: user.email
            }
        })

        if (find_user) {
            return res.status(400).json({ message: "User already exists" })
        } else {
            bcrypt.hash(user.password, 10).then((hash: any) => {
                user.password = hash
                Users.create(user).then((createUser: any) => {
                    const accessToken = createToken(createUser)
                    return res.status(200).json({
                        message: "User register successful",
                        createUser,
                        accessToken
                    })
                })
                    .catch((err: any) => {
                        if (err) {
                            res.status(400).json({ error: err })
                        }
                    })
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { login } = req.body
        const find_user = await Users.findOne({
            where: {
                email: login.email
            }
        })

        if (!find_user) {
            return res.status(400).json({ message: "User does not exists" })
        } else {
            const dbPassword = find_user.password
            bcrypt.compare(login.password, dbPassword).then((match) => {
                if (!match) {
                    res.status(400).json({
                        error: "Wrong Credential!"
                    })
                } else {
                    const accessToken = createToken(find_user)
                    if (accessToken) {
                        return res.status(200).json({
                            message: "User login successful",
                            user: find_user,
                            accessToken
                        })
                    }
                }
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}