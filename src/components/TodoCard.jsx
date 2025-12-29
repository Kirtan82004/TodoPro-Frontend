import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleTodo,
  removeTodo,
  editTodo
} from "../store/todoSlice";

const TodoCard = ({ todo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("AccessToken");

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  /* 🔹 TOGGLE */
  const handleToggle = (e) => {
    e.stopPropagation();
    dispatch(toggleTodo({ token, id: todo._id }));
  };

  /* 🔹 UPDATE */
  const handleUpdate = (e) => {
    e.stopPropagation();
    if (!title.trim()) return;

    dispatch(
      editTodo({
        token,
        id: todo._id,
        data: { title }
      })
    );

    setIsEditing(false);
  };

  /* 🔹 DELETE */
  const handleDelete = (e) => {
    e.stopPropagation();
    if (!confirm("Delete this todo?")) return;

    dispatch(removeTodo({ token, id: todo._id }));
  };

  return (
    <div
      onClick={() => navigate(`/sub-todo/${todo._id}`)}
      className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex justify-between items-center cursor-pointer"
    >
      {/* LEFT */}
      <div className="flex-1">
        {isEditing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="border px-2 py-1 rounded w-full"
          />
        ) : (
          <>
            <h3
              className={`font-semibold text-lg ${
                todo.isCompleted
                  ? "line-through text-gray-400"
                  : ""
              }`}
            >
              {todo.title}
            </h3>
            <p className="text-sm text-gray-500">
              {todo.isCompleted ? "Completed" : "Pending"}
            </p>
          </>
        )}
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-3 ml-4">
        {/* Toggle */}
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={handleToggle}
          onClick={(e) => e.stopPropagation()}
          className="w-5 h-5 accent-blue-600"
        />

        {/* Edit */}
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="text-green-600 text-sm"
          >
            Save
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="text-blue-600 text-sm"
          >
            Edit
          </button>
        )}

        {/* Delete */}
        <button
          onClick={handleDelete}
          className="text-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
