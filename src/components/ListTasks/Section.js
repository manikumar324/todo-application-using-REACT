import React from 'react';
import { useDrop } from 'react-dnd';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import Header from './Header'; // Ensure to import Header component
import Task from './Task'; // Ensure to import Task component

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = 'Todo';
  let bg = 'bg-slate-500';
  let tasksToMap = todos;

  if (status === 'inProgress') {
    text = 'In Progress';
    bg = 'bg-purple-500';
    tasksToMap = inProgress;
  } else if (status === 'closed') {
    text = 'Closed';
    bg = 'bg-green-500';
    tasksToMap = closed;
  }

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const updatedTasks = prev.map((task) =>
        task.id === id ? { ...task, status } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      toast('Task Status Changed', { icon: '😯' });
      return updatedTasks;
    });
  };

  return (
    <div
      ref={drop}
      className={`w-[110px] font-bold text-xs xl:w-64 2xl:w-64 lg:w-64 rounded-md p-1 ${
        isOver ? 'bg-slate-200' : ''
      } sm:mb-10 sm:w-[130px] md:w-44`}
    >
      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
};

Section.propTypes = {
  status: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
  inProgress: PropTypes.array.isRequired,
  closed: PropTypes.array.isRequired,
};

export default Section;
