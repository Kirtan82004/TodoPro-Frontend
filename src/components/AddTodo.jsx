import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { fetchTodos, createTodoThunk } from "../store/todoSlice.js";

const AddTodoForm = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.todo);

  const token = localStorage.getItem("accessToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    dispatch(
      createTodoThunk({
        token,
        title: title.trim(),
      })
    );

    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row gap-3"
    >
      <input
        type="text"
        placeholder="Add a new todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <Button type="submit" loading={loading}>
        Add Todo
      </Button>
    </form>
  );
};

export default AddTodoForm;
