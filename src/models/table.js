import mongoose, { Schema, models, model } from "mongoose";

const tableSchema = mongoose.Schema ({
    email: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    total: {
        type: Number,
    },

    debit: {
        type: Number,
    },

    credit: {
        type: Number,
    },

    loan: {
        type: Number,
    },
},
)
const table = mongoose.models.table || mongoose.model("table", tableSchema)
export default table