import mongoose from "mongoose";

const historySchema = mongoose.Schema ({
    usercode: {
        type: String,
    },
    transactiontype: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    desc: {
        type: String
    },

    mode: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
},
{
    timestamps: true
}
)

export const History = mongoose.model('History', historySchema)