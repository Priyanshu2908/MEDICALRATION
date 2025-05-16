'use client';
import { IconSquareRoundedCheck, IconSquareRoundedCheckFilled, IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react'

const TodoList = () => {

    // let count = 0;
    // const [count, setCount] = useState(0);

    const [taskList, setTaskList] = useState([
        { text: 'task 1', completed: false },
    ]);

    const addNewTask = (e) => {

        if (e.code === 'Enter') {

            if (!e.target.value.trim()) {
                return alert('Please enter a task');
            }

            console.log(e.target.value);

            const newTask = { text: e.target.value, completed: false };

            setTaskList([newTask, ...taskList]);

            e.target.value = '';
        }
    }

    const deleteTask = (index) => {
        console.log(index);

        const temp = taskList;
        temp.splice(index, 1);
        setTaskList([...temp]);
    }

    const toggleTask = (index) => {
        const temp = taskList;

        temp[index].completed = !temp[index].completed;
        setTaskList([...temp]);
    }

    return (
        <div className='bg-slate-100 h-screen'>
            <div className='max-w-[80%] mx-auto py-10'>
                <h1 className='font-bold text-center my-5 text-3xl'>TODO LIST</h1>
                <div className='bg-white rounded-lg shadow-lg'>
                    <div className='p-6 border-b-2'>
                        <input
                            onKeyDown={addNewTask}
                            className='w-full px-3 py-2 border-2 rounded-md'
                            type="text" />
                        {/* <h1 className='text-2xl font-bold'>{count}</h1>
                        <button className='border p-3' onClick={() => {
                            setCount(count + 1);
                            console.log(count);
                        }} >Add count</button> */}
                    </div>
                    <div className='p-8 h-[70vh] overflow-y-scroll'>
                        {
                            taskList.map((task, index) => {
                                return <div key={index} className='shadow mb-5 rounded-lg p-5 bg-blue-700 text-white flex justify-between items-center'>
                                    <div>
                                        {task.completed ?
                                            <p className='bg-white w-fit text-green-500 font-bold text-sm rounded-full px-3'>Complete</p> :
                                            <p className='bg-white w-fit text-yellow-700 font-bold text-sm rounded-full px-3'>Pending</p>
                                        }
                                        <p className='font-bold'>{task.text}</p>
                                    </div>
                                    <div className='flex gap-3'>
                                        <button className='bg-white p-2 rounded' onClick={() => { deleteTask(index) }}>
                                            <IconTrash color='red' size={24} />
                                        </button>
                                        <button className='bg-white p-2 rounded' onClick={() => { toggleTask(index) }}>
                                            {
                                                task.completed ?
                                                    <IconSquareRoundedCheckFilled className='text-green-700' size={24} /> :
                                                    <IconSquareRoundedCheck className='text-green-700' size={24} />
                                            }
                                        </button>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoList;