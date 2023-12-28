import express from "express"
import { History } from "../../models/historymodel.js"

const router = express.Router()

router.get('/main', async (req,res)=> {
    try{
        const historyList = await History.find({})
        res.json(historyList)
    }
    catch(err)
    {
        console.log(err)
    }
})

router.post('/main', async(req,res)=> {
    try {
        if(!req.body.usercode || !req.body.transactiontype || !req.body.amount || !req.body.desc || !req.body.mode || !req.body.date) {
            res.send("Send all required fields: amount, description, mode, and date")
        }
        const newEntry = {
            usercode: req.body.usercode,
            transactiontype: req.body.transactiontype,
            amount: req.body.amount ,
            desc: req.body.desc,
            mode: req.body.mode,
            date: req.body.date
        }

        const sendHistory = await History.create(newEntry)
        res.send(sendHistory)
    }
    catch(err)
    {
        console.log(err);
    }
})

router.get('/main/Debit', async (req,res)=> {
    try{
        const historyList = await History.find({"transactiontype": "debit"})
        res.json(historyList)
    }
    catch(err)
    {
        console.log(err)
    }
    
})

router.get('/main/Credit', async (req,res)=> {
    try{
        const historyList = await History.find({"transactiontype":"credit"})
        res.json(historyList)
    }
    catch(err)
    {
        console.log(err)
    }
    
})

router.get('/main/Loan', async (req,res)=> {
    try{
        const historyList = await History.find({"transactiontype":"loan"})
        res.json(historyList)
    }
    catch(err)
    {
        console.log(err)
    }
    
})

export default router
