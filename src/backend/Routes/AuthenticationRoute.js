import express from "express"
import { Users } from "../../models/UsersModel.js"

const router = express.Router()

router.get('/', (req,res)=>{
    res.send("Hello")
})

router.post('/', async(req,res)=> {
    try {
        if(!req.body.usercode || !req.body.name || !req.body.password) {
            res.send("Send all required fields: name, password, userCode")
        }
        const newEntry = {
            name: req.body.name,
            password: req.body.password,
            usercode: req.body.usercode,
        }

        const sendUser = await Users.create(newEntry)
        res.send(sendUser)
    }
    catch(err)
    {
        console.log(err);
    }
})
export default router