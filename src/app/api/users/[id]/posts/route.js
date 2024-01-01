import { connectToDB } from "@/utils/database";
import History from "@/models/history";

export const GET = async (request, {params})=> {
    try{
        await connectToDB()

        const tabledata = await History.find({email: params.id})
        console.log("Success")

        return new Response(JSON.stringify(tabledata), {status:200})
    }
    catch(error) {
        console.log(error)
        console.log("Failed")
        return new Response("Failed", {status:500})
    }
}