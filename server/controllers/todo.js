const Todo  = require('../models/todo');

exports.getAllTodo = (req,res) =>{
    Todo.find()
        .then((todo) => res.json(todo))
    
        .catch((err) =>
            res
                .status(404)
                .json({ message : "To-Do not found", error: err.message})
            );
};

exports.postCreateTodo = (req,res) => {
    Todo.create(req.body)
        .then((data) => res.json({ message: "To-Do added successfully", data}))
        
        .catch((err) =>
            res
                .status(400)
                .json({ message : "Failed to add To-Do", error: err.message})
            );
};

exports.putUpdateTodo = (req,res) =>{
    Todo.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.json({ message: "Updated successfully", data}))
        
        .catch((err) =>
        res
            .status(400)
            .json({ message : "Failed to update To-Do", error: err.message})
        );
};

exports.deleteTodo = (req,res) =>{
    Todo.findByIdAndDelete(req.params.id)
        .then((data) =>
            res.json({  message: "To-Do deleted successfully", data }))
        
        .catch((err) =>
            res
                .status(404)
                .json({ message : "To-Do not found", error: err.message})
            );
}