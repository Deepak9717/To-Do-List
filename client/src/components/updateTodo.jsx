import { useState } from "react";
import axios from "axios";

export function UpdateTodo({ _id, todo, handleClose, handleReload}) {
    const [data, setData] = useState({
         title: todo.title,
         description: todo.description });

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        axios
            .put(`http://localhost:8000/api/todo/${_id}`, data)
            .then((res) => {
                setData({ title: "", description: "" });
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Failed to update todo");
                console.log(err.message);
            });
    }
 
    return (
        <form className="modal"
            onSubmit={(e) => {
                handleSubmit(e);
                handleClose();
                handleReload();
            }}
        >
            <p onClick={handleClose} className="close">&times;</p>
            <h2>Edit Your To-Do</h2>
            <label name="title">Title</label>
            <input type="text" 
                name="title" 
                placeholder="Enter New Title..."
                value={data.title}
                onChange={handleChange} />

            <label name="description">Description</label>
            <input type="text" 
                name="description" 
                placeholder="Enter New Description..."
                value={data.description}
                onChange={handleChange} />
            <div>
                <button type="submit">Edit</button>
            </div>
        </form>
    );
}