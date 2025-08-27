import { legacy_createStore, applyMiddleware } from "redux";
import { thunk } from "./thunk";
import { searchToDos, sortedToDos } from "../utils/index";
//import { withExtraArgument } from "redux-thunk";
//import { withExtraArgument } from "redux-thunk";

const initialState = {
  isLoading: false,
  error: null,
  todos: [],
};

const ADD__TODO__SUCCESS = "ADD__TODO__SUCCESS";
const DELETE__TODO__SUCCESS = "DELETE__TODO__SUCCESS";

// const action = {type: 'ADD', payload: {name: 'test'}}
const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD__TODO__SUCCESS: {
      return {
        ...state,
        todos: [...state.todos, payload],
      };
    }
    case DELETE__TODO__SUCCESS: {
      return {
        ...state,
        isLoading: false,
        todos: state.todos.filter((todo) => todo.id !== payload),
      };
    }
    case "SEARCH__TODO": {
      return {
        ...state,
        todos: payload,
      };
    }
    case "ADD__TODO__LOADING": {
      return {
        ...state,
        isLoading: payload,
      };
    }
    case "ADD__TODO__ERROR": {
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    }
    case "DELETE__TODO__LOADING": {
      return {
        ...state,
        isLoading: payload,
      };
    }
    case "DELETE__TODO__ERROR": {
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    }
    case "UPDATE__TODO__SUCCESS": {
      const index = state.todos.findIndex((todo) => todo.id === payload.id);
      const newTodos = [...state.todos];
      newTodos[index] = payload;

      return {
        ...state,
        isLoading: false,
        todos: newTodos,
      };
    }
    case "UPDATE__TODO__LOADING": {
      return {
        ...state,
        isLoading: payload,
      };
    }
    case "UPDATE__TODO__ERROR": {
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    }
    case "FETCH__TODOS__SUCCESS": {
      return {
        ...state,
        ...payload,
      };
    }
    case "FETCH__TODOS__LOADING": {
      return {
        ...state,
        isLoading: payload,
      };
    }
    case "FETCH__TODOS__ERROR": {
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const searchFetchToDos = (searchToDo) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3000/TodoList");
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    const newTodos = searchToDos(data, searchToDo);

    dispatch({ type: "SEARCH__TODO", payload: newTodos });
  } catch (error) {
    console.log(error);
  }
};

export const fetchTodos = (sort) => async (dispatch) => {
  dispatch({
    type: "FETCH__TODOS__LOADING",
    payload: true,
  });
  try {
    const response = await fetch("http://localhost:3000/TodoList");
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();

    if (sort) {
      dispatch({
        type: "FETCH__TODOS__SUCCESS",
        payload: { todos: sortedToDos(data), isLoading: false },
      });
    } else {
      dispatch({
        type: "FETCH__TODOS__SUCCESS",
        payload: { todos: data, isLoading: false },
      });
    }
  } catch (error) {
    dispatch({
      type: "FETCH__TODOS__ERROR",
      payload: error,
    });
  }
};

export const updateTodoAsync = (id, payload) => async (dispatch) => {
  dispatch({
    type: "UPDATE__TODO__LOADING",
    payload: true,
  });
  try {
    const response = await fetch(`http://localhost:3000/TodoList/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...payload }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    dispatch({
      type: "UPDATE__TODO__SUCCESS",
      payload: data,
    });
    //navigate("/");
  } catch (error) {
    dispatch({
      type: "UPDATE__TODO__ERROR",
      payload: error,
    });
  }
};

export const deleteTodoAsync = (id) => async (dispatch) => {
  dispatch({
    type: "DELETE__TODO__LOADING",
    payload: true,
  });
  try {
    const response = await fetch(`http://localhost:3000/TodoList/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    dispatch({
      type: "DELETE__TODO__SUCCESS",
      payload: id,
    });
    //navigate("/");
  } catch (error) {
    dispatch({
      type: "DELETE__TODO__ERROR",
      payload: error,
    });
  }
};

export const createTodoAsync = (payload) => async (dispatch) => {
  dispatch({
    type: "ADD__TODO",
    payload: true,
  });
  try {
    const response = await fetch("http://localhost:3000/TodoList", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({ title: payload }),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const newTodo = await response.json();
    dispatch({
      type: "ADD__TODO__SUCCESS",
      payload: newTodo,
    });
    //navigate("/");
  } catch (error) {
    dispatch({
      type: "ADD__TODO__ERROR",
      payload: error,
    });
  }
};

export const createStore = () => {
  //const store = legacy_createStore(appReducer, withExtraArgument());
  const store = legacy_createStore(appReducer, applyMiddleware(thunk));

  return store;
};
