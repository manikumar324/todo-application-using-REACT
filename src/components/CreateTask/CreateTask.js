import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const CreateTask = ({tasks,setTasks}) => {
    const[task,setTask]=useState({
        id:"",
        name:"",
        status:"todo"          //can also be inprogress or closed.
    })
    console.log(task)
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(task.name.length < 3) return toast.error("A task must have more than 3 Characters")
        if(task.name.length > 100) return toast.error("A task does not contain more than 100 Characters")

        setTasks((prev)=>{
            const list=[...prev,task]
            localStorage.setItem("tasks",JSON.stringify(list))
            return list
        })
        toast.success("Task Created")
        setTask({ id: "", name: "", status: "todo" }); //reset the task input
    }
  return (
    <form onSubmit={handleSubmit}>
        <input type='text' value={task.name} className='border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-10 lg:w-64 px-1 md:w-64 sm:w-[220px] w-[150px]'
            onChange={(e)=>setTask({...task,id:uuidv4(),name:e.target.value})}
        />
        <button className='bg-cyan-500 text-white px-4 h-10 rounded-md'>Create</button>
    </form>
  )
}

export default CreateTask;