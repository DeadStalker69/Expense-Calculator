import mongoose from "mongoose";

export const connectToDB = async()=> {
    await mongoose.connect("mongodb+srv://name:name@expensecalc.31jpuks.mongodb.net/expense-calc?retryWrites=true&w=majority")
    .then(()=> {
        console.log("App connected to database")
    })
    .catch((error)=> {
        console.log(error)
    })
}