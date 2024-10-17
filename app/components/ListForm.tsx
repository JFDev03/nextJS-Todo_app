'use client'
import React, { useState, forwardRef } from 'react';

type ChildProps = {
    id: string;
    onClick: () => void;
    handleFetchTask: () => void;
  };
  const ListForm = forwardRef<HTMLDivElement, ChildProps>(({ id, onClick,handleFetchTask }) => {
  const [task, setTask] = useState('');

  const clearInputs = () => {
    setTask('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(task === ""){
        alert("task should be filled")
    }
    try {
      const response = await fetch('/api/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert('Task created successfully');
        clearInputs()
        handleFetchTask();
      } else {
        alert('Error creating task');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  


  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs form-control"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
            <button className="btn btn-outline btn-success mt-4" type="submit">
              Submit
            </button>
        </form>
        <div className="modal-action">
            <button
              className="btn btn-outline btn-success"
              type="button"
              onClick={clearInputs}
            >
              Clear
            </button>
          <button className="btn" onClick={onClick}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default ListForm;
