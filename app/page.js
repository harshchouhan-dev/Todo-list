"use client";
import React, { useState } from "react";

const page = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Update an existing task
      const updatedTasks = [...mainTask];
      updatedTasks[editIndex] = { ...updatedTasks[editIndex], title, desc };
      setMainTask(updatedTasks);
      setEditIndex(null); // Reset edit mode
    } else {
      // Add a new task
      setMainTask([...mainTask, { title, desc, completed: false }]);
    }
    settitle("");
    setdesc("");
  };

  const editHandler = (i) => {
    const taskToEdit = mainTask[i];
    settitle(taskToEdit.title);
    setdesc(taskToEdit.desc);
    setEditIndex(i); // Track which task is being edited
  };

  const deleteHandler = (i) => {
    let copytask = [...mainTask];
    copytask.splice(i, 1);
    setMainTask(copytask);
  };

  const toggleCompleteHandler = (i) => {
    const updatedTasks = [...mainTask];
    updatedTasks[i].completed = !updatedTasks[i].completed;
    setMainTask(updatedTasks);  
  };

  let renderTask = <h2>Task not available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className="flex items-center justify-between w-full">
          <div className="flex justify-between w-1/2 mb-5 items-center">
            <h2
              className={`text-2xl font-bold ${
                t.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {t.title}
            </h2>
            <h6
              className={`text-lg font-semibold ${
                t.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {t.desc}
            </h6>
          </div>
          <div className="w-1/2 flex gap-4 mx-5 items-center mb-5">
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleCompleteHandler(i)}
              className="w-5 h-5"
            />
            <button
              onClick={() => deleteHandler(i)}
              className="bg-red-400 rounded px-4 py-2 text-white font-semibold"
            >
              Delete
            </button>
            <button
              onClick={() => editHandler(i)}
              className="bg-yellow-400 rounded px-4 py-2 text-white font-semibold"
            >
              Edit List
            </button>
          </div>
        </li>
      );
    });
  }

  return (
    <>
      <div className="text-center font-bold text-2xl bg-black text-white p-5 ">
        Harsh Todo's list
      </div>
      <form
        onSubmit={submitHandler}
        className="flex justify-between items-center mx-5 w-2/3"
      >
        <input
          value={title}
          onChange={(e) => settitle(e.target.value)}
          type="text"
          placeholder="Enter task title"
          className="text-xl border-2 border-zinc-800 m-5 px-4 py-2"
        />
        <input
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
          type="text"
          placeholder="Enter task description"
          className="text-xl border-2 border-zinc-800 m-5 px-4 py-2"
        />
        <button className="bg-black rounded px-4 py-2 text-white font-semibold">
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </form>
      <hr />
      <div className="bg-slate-400 p-4 ">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default page;
