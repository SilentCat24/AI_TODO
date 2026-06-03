const Todo=require('../Model/Task');
const express = require("express");
const router = express.Router();
const {generateSuggestions} = require('../services/Ai');




router.post('/Tasks',async (req,res)=>{
try{
    const {task,scheduledAt}=req.body;
    if (!task || typeof task !== "string" || task.trim() === ""|| !scheduledAt) {
      return res.status(400).json({ error: "task or Scheduled is required" });
    }

      const scheduledDate = new Date(scheduledAt);
         if (isNaN(scheduledDate.getTime())) {
      return res.status(400).json({ error: "scheduledAt must be valid" });
    }

    if (scheduledDate <= new Date()) {
      return res.status(400).json({ error: "scheduledAt must be future date/time" });
    }

 const suggestions = await generateSuggestions(task);

    const todo=await Todo.create({
        task:task,
        scheduledAt:scheduledAt,
          suggestions: suggestions,
    });

    res.status(201).json({
        message:"Todo Created Succesfully"
    })
    console.log("Todo Created Already")
}catch(err){
    console.log(err)
}
})



router.get("/allTasks", async (req, res) => {
  try {
    const allTodos = await Todo.find().sort({ scheduledAt: 1 });
    res.json({ todos: allTodos });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch todos",
      error: error.message,
    });
  }
});






module.exports=router;