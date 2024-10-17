
import React, { useState } from 'react'

type taskListType = {
    id:number
    task:string
    status:number
}
type ListTablesProps = {
    taskLists: Array<taskListType>;
    handleFetchTask: () => void;
  };
const listTables:React.FC<ListTablesProps> = ({taskLists,handleFetchTask}) => {
    const handleDeleteData =async (id:number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                  },
            });
            const result = await response.json();

      if (result) {
        alert('Task Deleted successfully');
        handleFetchTask();
      } else {
        alert('Error Deleting task');
      }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    const HandleDoneData =async (id:number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                  },
            });
            const result = await response.json();

      if (result) {
        alert('Task Updated successfully');
        handleFetchTask();
      } else {
        alert('Error Updating task');
      }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }
  return (
    <table className='table table-zebra-zebra'>
        <thead>
            <tr>
                <th>Index</th>
                <th>Task Name</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {taskLists.map((list:taskListType, index: number) => <tr key={list.id}>
                <td>{ index+1 }</td>
                <td>{ list.task }</td>
                <td>{ list.status === 0? <button className='btn btn-outline btn-success' 
                onClick={()=>{
                    HandleDoneData(list.id);}}
                    >Done</button> : 'Done'} <button className='btn btn-outline btn-error' onClick={()=>handleDeleteData(list.id)}>Delete</button></td>
            </tr>)}
        </tbody>
    </table>
  )
}

export default listTables