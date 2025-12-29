import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createTodo,
    getTodos,
    toggleTodoCompletion,
    deleteTodo,
    updateTodo,
    getTodoById,
    addSubTodo,
    toggleSubTodoCompletion,
    deleteSubTodo
} from "../services/todo.services";

/* 🔹 FETCH TODOS */
export const fetchTodos = createAsyncThunk(
    "todo/fetchTodos",
    async (token, { rejectWithValue }) => {
        try {
            const res = await getTodos(token);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const createTodoThunk = createAsyncThunk(
    "todo/createTodo",
    async ({ token, title }, { rejectWithValue }) => {
        try {
            const res = await createTodo(token, { title });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

/* 🔹 TOGGLE */
export const toggleTodo = createAsyncThunk(
    "todo/toggleTodo",
    async ({ token, id }, { rejectWithValue }) => {
        try {
            const res = await toggleTodoCompletion(token, id);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

/* 🔹 DELETE */
export const removeTodo = createAsyncThunk(
    "todo/deleteTodo",
    async ({ token, id }, { rejectWithValue }) => {
        try {
            await deleteTodo(token, id);
            return id;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

/* 🔹 UPDATE */
export const editTodo = createAsyncThunk(
    "todo/updateTodo",
    async ({ token, id, data }, { rejectWithValue }) => {
        try {
            const res = await updateTodo(token, id, data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchTodoByIdThunk = createAsyncThunk(
    "todos/fetchById",
    async ({ token, id }, { rejectWithValue }) => {
        try {
            console.log("Fetching Todo with ID in slice:", id);
            const res = await getTodoById(token, id);
            console.log("Fetched Todo:", res.data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const addSubTodoThunk = createAsyncThunk(
    "todos/addSubTodo",
    async ({ token, id, title }, { rejectWithValue }) => {
        try {
            const res = await addSubTodo(token, id, { title });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const toggleSubTodoThunk = createAsyncThunk(
    "todos/toggleSubTodo",
    async ({ token, id, subTodoId }, { rejectWithValue }) => {
        try {
            const res = await toggleSubTodoCompletion(token, id, subTodoId);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const deleteSubTodoThunk = createAsyncThunk(
    "todos/deleteSubTodo",
    async ({ token, id, subTodoId }, { rejectWithValue }) => {
        try {
            const res = await deleteSubTodo(token, id, subTodoId);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);


const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todos: [],
        loading: false,
        currentTodo: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            /* FETCH */
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            /* CREATE */
            .addCase(createTodoThunk.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })

            /* TOGGLE */
            .addCase(toggleTodo.fulfilled, (state, action) => {
                const index = state.todos.findIndex(
                    (t) => t._id === action.payload._id
                );
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })

            /* DELETE */
            .addCase(removeTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(
                    (t) => t._id !== action.payload
                );
            })

            /* UPDATE */
            .addCase(editTodo.fulfilled, (state, action) => {
                const index = state.todos.findIndex(
                    (t) => t._id === action.payload._id
                );
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            });
        /* ADD SUBTODO */
        builder
            .addCase(fetchTodoByIdThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTodoByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTodo = action.payload;
            })

            .addCase(addSubTodoThunk.fulfilled, (state, action) => {
                state.currentTodo = action.payload;
            })

            .addCase(toggleSubTodoThunk.fulfilled, (state, action) => {
                state.currentTodo = action.payload;
            })

            .addCase(deleteSubTodoThunk.fulfilled, (state, action) => {
                state.currentTodo = action.payload;
            });

    }
});

export default todoSlice.reducer;
export const {

} = todoSlice.actions;
