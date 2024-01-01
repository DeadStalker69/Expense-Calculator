import { connectToDB } from "@/utils/database";
import table from "@/models/table";

export const GET = async (request, {params})=> {
    try{
        await connectToDB()

        const tabledata = await table.find({email: params.id})
        console.log("Success")

        return new Response(JSON.stringify(tabledata), {status:200})
    }
    catch(error) {
        console.log(error)
        console.log("Failed")
        return new Response("Failed", {status:500})
    }
}