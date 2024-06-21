const mongoose = require("mongoose")
const TaskShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "you must provide a name"],
        trim: true,// if you give it "   alaa ss" it will make it "alaa ss",
        maxlength:[20,"name cannot contain more than 20 letters"]
    },
    complited: {
        type: Boolean,
        default:false
    }
})
module.exports=mongoose.model("Task",TaskShema)