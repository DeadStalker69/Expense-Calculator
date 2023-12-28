import express from "express"
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { fileURLToPath } = require('url');
const { dirname } = require('path');
import { History } from "../../models/historymodel.js"
import path from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router()

router.use(express.static(path.join(__dirname)))
router.get('/converter', (req,res)=>{
   res.render(path.join(__dirname, '..', '..', 'app', 'Conversion_calculator', 'page'))
})

router.post('/converter', async(req,res)=> {
   try {
       if(!req.body.amount || !req.body.desc || !req.body.mode || !req.body.date) {
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
export default router