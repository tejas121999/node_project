import express, { Request, Response } from "express"
const router = express.Router()
import { registerUser, login } from "../controller/Users"


router.post('/register', registerUser)
router.post('/login', login)


export {
    router
}