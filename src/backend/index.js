import express from "express"
import mongoose  from "mongoose";
import { History } from "../models/historymodel.js";
import { Users } from "../models/UsersModel.js";
import HistoryRoutes from "../backend/Routes/HistoryRoutes.js"
import ConverterRoutes from "../backend/Routes/ConverterRoutes.js"
import AuthenticationRoute from "./Routes/AuthenticationRoute.js"
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/user', HistoryRoutes)
app.use('/user', ConverterRoutes)
app.use('/auth', AuthenticationRoute)

mongoose.connect("mongodb+srv://name:name@expensecalc.31jpuks.mongodb.net/expense-calc?retryWrites=true&w=majority")
.then(()=> {
    console.log("App connected to database")
    app.listen(3001)
})
.catch((error)=> {
    console.log(error)
})