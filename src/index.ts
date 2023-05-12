import express, { Request, Response } from "express"
import bodyParser from 'body-parser'
import cors from 'cors'
import { Router } from "./routes/api";
const app = express();
const PORT: any = 5000

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/api', Router)

app.post('/post', (req: Request, res: Response): void => {
    console.log(req.body)
})

app.listen(PORT, () => {
    console.log("server is running on port", PORT)
})