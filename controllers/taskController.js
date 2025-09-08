const Task = require("../models/taskModel");

//Read Task
exports.readTasks = async(req,res) => {
    try{
        const tasks = await Task.find({user:req.user._id})
        if(!tasks || tasks.length === 0){
            return res.status(404).json({
                message:"No Task is created under this user"
            });
        }
        res.status(200).json({
            message:"User task fetched successfully",
            tasks
        })

    }
    catch(err){
        res.status(500).json({message:`Internal Server Error ${err.message}`})
    }
}
//create Task
exports.createTask = async(req,res) => {
    try{
        const {title,description,status,priority,dueDate} = req.body;
        const createTask = await Task.create({
            title,description,status,priority,dueDate,user:req.user._id
        })
        res.status(201).json({
            message:"Task Created Successfully",
            task:createTask
        })

    }
    catch(err){
        res.status(500).json({message:`Internal Server Error ${err.message}`})
    }
}

//update Task
exports.updateTask = async(req,res) => {
    try{
        const updatetasks = await Task.findOneAndUpdate({_id:req.params.id,user:req.user._id},req.body,{new:true});
        if(!updatetasks){return res.status(404).json({message:"No Task found"});
        }
        res.status(200).json({
            message:"Task Updated Successfully",
            tasks:updatetasks
        })

    }
    catch(err){
        res.status(500).json({message:`Internal Server Error ${err.message}`})
    }
}

//delete Task
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id, // ensure user can delete only their own tasks
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      task: deletedTask,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Internal Server Error: ${err.message}` });
  }
};
