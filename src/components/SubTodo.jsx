import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import {
  fetchTodoByIdThunk,
  addSubTodoThunk,
  toggleSubTodoThunk,
  deleteSubTodoThunk,
} from "../store/todoSlice";

const SubTodo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [subTitle, setSubTitle] = useState("");

  const { todos, currentTodo, loading } = useSelector(
    (state) => state.todo
  );

  const token = localStorage.getItem("accessToken") 

  // 🔹 Final todo source
  const todo = currentTodo;

  /* 🔹 Fetch Todo if not in store */
  useEffect(() => {
  
      dispatch(fetchTodoByIdThunk({ token, id }));
    
  }, [dispatch]);

  /* 🔹 Add SubTodo */
  const handleAddSubTodo = () => {
    if (!subTitle.trim()) return;

    dispatch(
      addSubTodoThunk({
        token,
        id,
        title: subTitle.trim(),
      })
    );

    setSubTitle("");
  };

  /* 🔹 Toggle SubTodo */
  const handleToggleSubTodo = (subTodoId) => {
    dispatch(
      toggleSubTodoThunk({
        token,
        id,
        subTodoId,
      })
    );
  };

  /* 🔹 Delete SubTodo */
  const handleDeleteSubTodo = (subTodoId) => {
    if (!window.confirm("Delete this sub todo?")) return;

    dispatch(
      deleteSubTodoThunk({
        token,
        id,
        subTodoId,
      })
    );
  };

  /* 🔹 Loading */
  if (loading) return <Loader fullScreen />;

  /* 🔹 Safety Guard */
  if (!todo) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading todo details...
      </p>
    );
  }

  const subTodos = todo.subTodos || [];

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Parent Todo */}
      <h1 className="text-2xl font-bold mb-6">
        {todo.title}
      </h1>

      {/* 🔹 ADD SUB TODO */}
      <div className="flex gap-2 mb-6">
        <input
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          placeholder="Add sub todo"
          className="flex-1 border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddSubTodo}
          disabled={!subTitle.trim()}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Add
        </button>
      </div>

      {/* 🔹 SUB TODOS */}
      {subTodos.length === 0 ? (
        <p className="text-gray-500 text-center">
          No sub todos yet 🚀
        </p>
      ) : (
        subTodos.map((sub) => (
          <div
            key={sub._id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded mb-2"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={sub.completed}
                onChange={() => handleToggleSubTodo(sub._id)}
                className="w-4 h-4 accent-blue-600"
              />
              <span
                className={
                  sub.completed
                    ? "line-through text-gray-400"
                    : ""
                }
              >
                {sub.title}
              </span>
            </div>

            <button
              onClick={() => handleDeleteSubTodo(sub._id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default SubTodo;
