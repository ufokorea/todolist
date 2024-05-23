const Task = require("../model/Task");

const taskController = {};

taskController.createTask= async (req,res)=>{
    try{
        const {task, isComplete} =req.body;  //클라이언트로부터 받기
        const {userId} =req;  //미들웨어에서 받는다.

        const newTask = new Task({task,isComplete,author : userId});  //데이터베이스 저장1
        await newTask.save();

        res.status(200).json({status : "OK", data : newTask});  //프런트에 상황 알려주기

    } catch (err) {
        res.status(400).json({status : "Fail", error : err});
    }

};


taskController.getTask= async (req,res)=>{
    try{
        const taskList = await Task.find({}).populate("author");

        res.status(200).json({status : "OK", data : taskList});

    } catch (err) {
        res.status(400).json({status : "Fail", error : err});
    }

};


// taskController.deleteTask= async (req,res)=>{
//     try{
//         // const {id} =req.body;  
//               console.log("del",req.params.id)
//         const taskList = await Task.findByIdAndDelete(req.params.id);
//         res.status(200).json({status : "delete OK", data : taskList});

//     } catch (err) {
//         res.status(400).json({status : "Fail", error : err});
//     }

// };

taskController.deleteTask = async (req, res) => {
    try {
      const deleteItem = await Task.deleteOne({_id : req.params.id});
      res.status(200).json({ status: "success", data: deleteItem });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };


taskController.updateTask= async (req,res)=>{
    try{
        const {isComplete} =req.body;   
  
        const updateList = await Task.updateOne({ _id : req.params.id} , { $set : { isComplete}});
        res.status(200).json({status : "Update OK", data : updateList});

    } catch (err) {
        res.status(400).json({status : "Fail", error : err});
    }

};


module.exports = taskController;