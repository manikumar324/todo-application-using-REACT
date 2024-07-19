import React, { useEffect, useState } from 'react';
import CreateTask from './components/CreateTask/CreateTask';
import ListTasks from './components/ListTasks/ListTasks';
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const isMobile = window.innerWidth < 768;

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <Toaster />
      <div className='bg-slate-100 w-screen min-h-screen flex flex-col items-center pt-20 gap-16'>
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
};

export default App;
