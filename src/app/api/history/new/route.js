import { connectToDB } from "@/utils/database"
import History from "@/models/history";

export const POST = async (req)=> {
    const { email, amount, desc, mode, date } = await req.json();

    try {
        await connectToDB();

        const newHistory = new History ({
            email: email,
            amount,
            desc,
            mode,
            date
        })
        await newHistory.save()
        return new Response(JSON.stringify(newHistory), {status: 201})
    }
    catch(error) {
        return new Response("Failed to push to DB")
    }   
}