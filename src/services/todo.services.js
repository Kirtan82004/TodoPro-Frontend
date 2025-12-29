import conf from "../config/conf";
import axios from "axios";

const API_URL = conf.API_URL;

const createTodo = async (token, todoData) => {
    console.log("Creating Todo with Data:", todoData);
  const res = await axios.post(`${API_URL}/todos`, todoData, {
      headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
    });
    console.log("Response from Create Todo API:", res);
    return res.data;
};

const getTodos = async (token) => {
    const res = await axios.get(`${API_URL}/todos`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
    });
    return res.data;
}
const updateTodo = async (token, todoId, todoData) => {

  const res = await axios.patch(`${API_URL}/todos/${todoId}`, todoData, {
      headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
    });
    return res.data;
};
const deleteTodo = async (token, todoId) => {
    const res = await axios.delete(`${API_URL}/todos/${todoId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
    });
    return res.data;
};

const getTodoById = async (token, todoId) => {
    console.log("Fetching Todo by ID in service:", todoId);
  const res = await axios.get(`${API_URL}/todos/${todoId}`, {
      headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
    });
    console.log("Fetched Todo Data:", res.data);
    return res.data;
}

const toggleTodoCompletion = async (token, todoId) => {
    console.log("Toggling completion for Todo ID:", todoId);
const res = await axios.patch(`${API_URL}/todos/${todoId}/toggle`, {}, {
    headers: {
        'Authorization': `Bearer ${token}`,
    },
    withCredentials: true,
});
return res.data;
}

const addSubTodo = async (token, todoId, subTodoData) => {
  const res = await axios.post(`${API_URL}/todos/${todoId}/subtodos`, subTodoData, {
      headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
    });
    return res.data;
}

const toggleSubTodoCompletion = async (token, todoId, subTodoId) => {
    const res = await axios.patch(`${API_URL}/todos/${todoId}/subtodos/${subTodoId}/toggle`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
    });
    return res.data;
}

const deleteSubTodo = async (token, todoId, subTodoId) => {
    const res = await axios.delete(`${API_URL}/todos/${todoId}/subtodos/${subTodoId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
    });
    return res.data;
}

export {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    getTodoById,
    toggleTodoCompletion,
    addSubTodo,
    toggleSubTodoCompletion,
    deleteSubTodo
};