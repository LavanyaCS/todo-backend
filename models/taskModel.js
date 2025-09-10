const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Title is required"], trim: true, maxlength: 100 },
    description: { type: String, required: [true, "Description is required"], trim: true, maxlength: 500 },
    status: { type: String, enum: ["Pending", "In-Progress", "Completed"], default: "Pending" },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    dueDate: { type: Date, default: () => Date.now() + 7*24*60*60*1000 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
},{timestamps:true}); 

module.exports = mongoose.model("Task", taskSchema);