import React, { useEffect, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import toast from 'react-hot-toast';
import Draggable from 'react-draggable';

const ListTasks = ({tasks,setTasks}) => {
    const[todos,setTodos]=useState([]);
    const[inProgress,setInprogress]=useState([]);
    const[closed,setClosed]=useState([]);

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

const Section = ({status,tasks,setTasks,todos,inProgress,closed})=>{
    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: "task",
          drop: (item) => addItemToSection(item.id),
          collect: (monitor) => ({
            isOver: !!monitor.isOver()
          })
        }))
    let text="Todo";
    let bg="bg-slate-500";
    let tasksTomap=todos

    if(status === "inProgress"){
        text="In Progress"
        bg = "bg-purple-500"
        tasksTomap=inProgress
    }

    if(status === "closed"){
        text="Closed"
        bg = "bg-green-500"
        tasksTomap=closed
    }
    const addItemToSection=(id)=>{
        console.log("dropped",id,status)
       setTasks((prev)=>{
        const mTasks=prev.map(t=>{
            if(t.id === id){
                return {...t, status:status}
            }
            return t;
        })
        localStorage.setItem("tasks",JSON.stringify(mTasks))
        toast("Task Status Changed",{icon:"😯"})
        return mTasks
       })
    };
   return(
    <div ref={drop} className={`w-[110px] font-bold text-xs xl:w-64 2xl:w-64 lg:w-64 rounded-md p-1 ${isOver?"bg-slate-200":""} sm:mb-10 sm:w-[130px] md:w-44`}>
        <Header text={text} bg={bg} count={tasksTomap.length}/>
        {tasksTomap.length > 0 && tasksTomap.map((task)=> <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks}/>)}
    </div>
   )
}

const Header = ({text,bg,count})=>{
    return (
        <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-white`}>
          {text}
          <div className='ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center'>{count}</div>
        </div>
      );
 }

 const Task=({task,tasks,setTasks})=>{
    const [{ isDragging }, drag] = useDrag(() => ({    //this code is copied from the react dnd  website to use Drag method.
        type: "task",
        item:{id:task.id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))

      console.log(isDragging)
    const handleRemove=(id)=>{
        console.log(id);    
        const fTasks=tasks.filter((t)=>t.id !== id)
        localStorage.setItem("tasks",JSON.stringify(fTasks))
        setTasks(fTasks)
        toast("Task Removed",{icon:"☠️"})
    }
    return(
        <Draggable>
            <div ref={drag} className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${isDragging?"opacity-25":"opacity-100"}`}>
            <p className=''>{task.name}</p>
            <button className='absolute bottom-4 right-1 text-slate-400' onClick={()=>{
                handleRemove(task.id)
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                strokeWidth={1.5} stroke="currentColor" 
                className="size-6">
                <path strokeLinecap="round" 
                strokeLinejoin="round" 
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            </button>
        </div>
        </Draggable>
    )
 }