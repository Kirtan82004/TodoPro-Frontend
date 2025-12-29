import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoCard from "../components/TodoCard";
import AddTodoForm from "../components/AddTodo";
import Loader from "../components/Loader";

import { fetchTodos } from "../store/todoSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { todos, loading, error } = useSelector(
    (state) => state.todo
  );

  const token =
    useSelector((state) => state.auth?.token) ||
    localStorage.getItem("token");

  // 🔹 Fetch Todos (ONLY ONCE)
  useEffect(() => {
    dispatch(fetchTodos({ token }));
  }, [dispatch, token]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* 🔹 ADD TODO FORM (TOP) */}
        <AddTodoForm />

        {/* 🔹 ERROR */}
        {error && (
          <p className="text-red-500 text-center mt-4">
            {error}
          </p>
        )}

        {/* 🔹 TODOS LIST */}
        {loading ? (
          <Loader />
        ) : todos.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No todos found 🚀
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {todos.map((todo) => (
              <TodoCard key={todo._id} todo={todo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
