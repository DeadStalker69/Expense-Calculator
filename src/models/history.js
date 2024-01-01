import mongoose, { Schema } from "mongoose";

const historySchema = mongoose.Schema ({
    email: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
)

const History = mongoose.models.History || mongoose.model('History', historySchema)
export default History