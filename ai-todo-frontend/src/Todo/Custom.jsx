import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/auth";

const useAuth = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState("");

  const todo = async (data) => {
    if (!data.task || !data.scheduledAt) {
      setError("Time and Task Both are required");
      return;
    }

    try {
      await axios.post(`${API_URL}/Tasks`, data);
      alert("Todo Created");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  const fetchdata = async () => {
    try {
      const res = await axios.get(`${API_URL}/allTasks`);

      console.log("API DATA:", res.data);

      setList(res.data.todos);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch tasks");
    }
  };

  return {
    error,
    todo,
    fetchdata,
    list,
  };
};

export default useAuth;