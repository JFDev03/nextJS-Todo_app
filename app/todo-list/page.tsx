'use client'
import React, { useEffect, useState } from 'react';
import ListForm from '../components/ListForm';
import ListTables from '../components/ListTables';

type TaskListType = {
    id: number;
    task: string;
    status: number;
};

const TodoList = () => {
    const [tasks, setTasks] = useState<TaskListType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const openModal = () => {
        const modal = document.getElementById('my_modal_5') as HTMLDialogElement | null;
        modal?.showModal();
    };

    const closeModal = () => {
        const modal = document.getElementById('my_modal_5') as HTMLDialogElement | null;
        modal?.close();
    };

    const handleFetchTask = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list`, {
                method: 'GET',
            });
            if (!res.ok) throw new Error('Network response was not ok');
        setLoading(false)
            const data: TaskListType[] = await res.json();
            setTasks(data);
        } catch (error) {
        setLoading(false)
            console.error('Failed to fetch tasks:', error);
            setError('Failed to fetch tasks');
        }
    };

    // Call the function to fetch tasks on component mount
    useEffect(() => {
        handleFetchTask();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <button className="btn" onClick={openModal}>
                Open Modal
            </button>
            <div>TodoList</div>
            <ListForm id="my_modal_5" onClick={closeModal} handleFetchTask={handleFetchTask} />
            <div className="text-center text-md">Task List Tables</div>
            <ListTables taskLists={tasks} handleFetchTask={handleFetchTask}/>
        </>
    );
};

export default TodoList;
