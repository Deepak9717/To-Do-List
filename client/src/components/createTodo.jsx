import { useState } from "react";
import axios from "axios";

export function CreateTodo({handleReload, handleOpenCreate}) {

    const [data, setData] = useState({
        title: "",
        description: "",
    });

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        axios
            .post("https://deepak-todo-app.netlify.app/api/todo", data)
            .then((res) => {
                setData({ title: "", description: "" });
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Error couldn't create TO-DO");
                console.log(err.message);
            });
    }

    return (
        <form className="modal" onSubmit={(e)=>{
            handleSubmit(e);
            handleOpenCreate();
            handleReload();
        }} noValidate>
            <p onClick={handleOpenCreate} className="close">&times;</p>
            <h2>Create Your To-Do</h2>
            <label name="title">
                Title
            </label>
            <input type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                placeholder="Enter Title..."
            />

            <label name="description">
                Description
            </label>
            <input type="text"
                name="description"
                value={data.description}
                onChange={handleChange}
                placeholder="Enter Description..."
            />

            <div>
                <button type="submit">
                    Save
                </button>
            </div>
        </form>
    );
}