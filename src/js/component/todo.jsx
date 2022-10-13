import React, { useState, useEffect } from 'react';

//create your first component
const ToDoList = () => {

    const [username, setUsername] = useState("");
    const [task, setTaskValue] = useState("");
    const [taskList, setTaskListValue] = useState([]);
    const [toggleCRUDButtons, setToggleCRUDButtons] = useState(false);

    const apiURL = "https://assets.breatheco.de/apis/fake/todos/user/"

    const createList = async ()=>{
        let tempUserName = "";
        while(tempUserName === "" || tempUserName === null){
            tempUserName = prompt('Ingresa un nombre de usuario:')
        }
        setUsername(tempUserName)
        setToggleCRUDButtons(true)
        try {
            const response = await fetch(apiURL+tempUserName, {
                method: "POST",
                body: JSON.stringify([]),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const updateList = async ()=>{
        try {
            const response = await fetch(apiURL+username, {
                method: "PUT",
                body: JSON.stringify(taskList),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const removeList = async ()=>{
        try {
            const response = await fetch(apiURL+username, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getList = async ()=>{
        try {
            const response = await fetch(apiURL+username, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            setTaskListValue(data)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }


    const handleKeyDown = event => {
        if (event.key === 'Enter' && !task == "" && !task.length <= 40) {
            let currentTask = {label: task, done: false}
            setTaskListValue((current) => [...current, currentTask]);
            setTaskValue("")
            console.log(taskList);
        }
      };

    const removeTask = (index) => {
        setTaskListValue(current =>[
        ...current.slice(0, index),
        ...current.slice(index + 1, current.length)
        ]);
    }

    useEffect(()=>{
        
    },[])

	return (
            <div className="container">
                <h1>todo</h1>
                <div className='crud my-2'>
                    <button type='button' className={toggleCRUDButtons == true ? 'd-none' : 'btn btn-primary mr-2'} onClick={()=> createList()}>Crear Lista</button>
                    <button type='button' className={toggleCRUDButtons == false ? 'd-none' : 'btn btn-primary mx-2'} onClick={()=> getList()}>Obtener Lista</button>
                    <button type='button' className={toggleCRUDButtons == false ? 'd-none' : 'btn btn-primary mx-2'} onClick={()=> updateList()}>Actualizar Lista</button>
                    <button type='button' className={toggleCRUDButtons == false ? 'd-none' : 'btn btn-primary mx-2'} onClick={()=> removeList()}>Eliminar Lista</button>
                </div>
                <div className="input-group input-group-lg w-50">
                    <label className="input-group-text rounded-0" htmlFor="inputTask"><i className="fas fa-tasks"></i></label>
                    <input type="text" id="inputTask" className="form-control rounded-0" placeholder="What needs to be done?" name="inputTask" maxLength={"40"} value={task} onChange={(e) => setTaskValue(e.target.value)} onKeyDown={handleKeyDown} aria-label="inputTask" aria-describedby="basic-addon1"/>
                </div>
                <ul className="list-group">
                    {taskList.map((element, index) => {
                        return (
                            <li key={index} className="list-group-item rounded-0 border w-50 d-flex justify-content-between align-items-center task-none">
                                {element.label}
                                <div>
                                    <button type='button' onClick={() => removeTask(index)} className='btn btn-danger'>X</button>
                                </div>
                            </li>
                        );
                    })}
                    <li className="list-group-item rounded-0 border w-50 text-muted"><small>{taskList.length} {taskList.length == 1 ? "item" : "items" } left</small></li>
                </ul>
            </div>
	);
};

export default ToDoList;
