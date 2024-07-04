import { useState, useEffect } from "react";
import axios from 'axios';
import { UpdateTodo } from "./updateTodo";
import { CreateTodo } from "./createTodo";
import { TodoCard } from './TodoCard'


export function ShowTodo() {
    const [todo, setTodo] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [id, setId] = useState("");
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${import.meta.env.REACT_API_URL}api/todo`)
            .then((res) => {
                setTodo(res.data);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            })
            .catch((err) => {
                console.log(err.message);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            });
    }, [reload]);


    function handleEdit(e) {
        if (e.target.name) {
            setId(e.target.name);
            setOpenUpdate(true);
        }
    }
    function handleOpenCreate() {
        setOpenCreate(!openCreate);
    }

    function handleTodo(e) {
        const itemId = e.target.name;
        const itemCheck = todo.find((item) => item._id === itemId);

        if (itemCheck) {
            setTodo((data) => {
                return data.filter((todo) => todo._id !== itemId);
            });
        }
    }
    function handleReload() {
        setReload(!reload);
    }

    function handleDelete(e) {
        axios
            .delete(`${import.meta.env.REACT_API_URL}/api/todo/${e.target.name}`)
            .then((res) => {
                if(res.status === 200)
                    handleTodo(e);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    function handleClose() {
        setId("");
        setOpenUpdate(false);
    }

    return (
        <>
            {openCreate ?
                (<div>
                    <div className="dark-bg" onClick={handleOpenCreate}></div>
                    <CreateTodo handleReload={handleReload} handleOpenCreate={handleOpenCreate} />
                </div>
                )
                : ""
            }


            <div className="create-btn-section">
                <button className="create-btn" onClick={handleOpenCreate}>
                    <img src="/plus-icon.png" alt="" />
                </button>
                <span>Add To-Do</span>
            </div>

            {
                loading ? (
                    <div className="loading"></div>
                ) : (
                    <section>
                        <div style={{ display: "flex",gap: "0.5rem" }}>
                            <img src="/notepad-icon.png" alt="" width="40px" />
                            <h1>Your To Do</h1>
                        </div>
                        <ul>
                            {
                                (todo.length !=0 ) ? 
                                (todo.map((data, index) => (
                                    <TodoCard data={data}
                                        key={index}
                                        handleEdit={handleEdit}
                                        handleDelete={handleDelete} />
                                )))
                                : (<h2>Your To-Do is Empty</h2>)
                                
                            }
                        </ul>
                    </section>
                )}

            {openUpdate ? (
                <div>
                    <div onClick={handleClose} className="dark-bg"></div>
                    <UpdateTodo
                        _id={id}
                        todo={todo.find((item) => item._id === id)}
                        handleClose={handleClose}
                        handleReload={handleReload}
                    />
                </div>
            ) : ("")
            }
        </>

    );
}
