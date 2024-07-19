import React, { useEffect, useState } from 'react'
import Section from './Section';


const ListTasks = ({tasks,setTasks}) => {
    const[todos,setTodos]=useState([]);
    const[inProgress,setInprogress]=useState([]);
    const[closed,setClosed]=useState([]);

    //Filter tasks based on their status whenever tasks change
    useEffect(()=>{
        const fTodos=tasks.filter((task)=>task.status === "todo")
        const finProgress=tasks.filter((task)=>task.status === "inProgress")
        const fclosed=tasks.filter((task)=>task.status === "closed")

        setTodos(fTodos)
        setInprogress(finProgress)
        setClosed(fclosed)
    },[tasks])

    const statuses=["todos","inProgress","closed"]
  return (
    <div className='flex lg:flex lg:gap-16 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-2 md:flex '>
        {statuses.map((status,index)=>(
            <Section  
            key={index} 
            status={status} 
            tasks={tasks} 
            setTasks={setTasks} 
            todos={todos} 
            inProgress={inProgress} 
            closed={closed}/>
        ))}
    </div>
  )
}

export default ListTasks;

