import { connectToDB } from "@/utils/database";
import table from "@/models/table";

const handler = async (req)=> {

    const { email, total, debit, credit, loan } = await req.json()
    try{
        await connectToDB()

        const existingtable = await table.findOne({
            email: email
        })

        if(!existingtable)
        {   
            const newTable = new table ({
            email: email,
            total,
            debit,
            credit,
            loan,
        })

        await newTable.save()
        return new Response(JSON.stringify(newTable), {status: 200})
        }
        else {
            existingtable.overwrite(        {
                email: email, total: total, debit:debit, credit:credit, loan:loan
            })
        await existingtable.save()
        return new Response(JSON.stringify(existingtable), {status:201})
        }
    }
    catch(error) {
        console.log(error)
        console.log("Failed")
        return new Response("Failed", {status:500})
    }
}
export {handler as POST, handler as PUT}