import React, { useState } from "react";
import useAuth from "./Custom";
import Tasks from "./Tasks";



const Todo = () => {
  const { todo, error } = useAuth();

  const [data, setData] = useState({
    task: "",
    scheduledAt: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    todo(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          placeholder="Enter Task"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="datetime-local"
          name="scheduledAt"
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Add Todo</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}



    <Tasks/>
    </div>
  );
};

export default Todo;