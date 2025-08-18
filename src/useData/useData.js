import { useState } from "react";
import { searchToDos, sortedToDos } from "../utils";

export const useData = () => {
  const [toDos, setToDos] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchToDos = async (inputs, search, sort) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/TodoList");
      if (!response.ok) {
        throw new Error("Ошибка в запросе на сервер");
      }
      const data = await response.json();
      if (search) {
        setToDos(searchToDos(data, inputs));
      } else {
        if (sort) {
          setToDos(sortedToDos(data));
        } else {
          setToDos(data);
        }
      }

      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const updateToDo = async (id, payload) => {
    try {
      const response = await fetch(`http://localhost:3000/TodoList/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          ...payload,
        }),
      });
      if (!response.ok) {
        throw new Error("Ошибка в запросе на сервер");
      }
      const newTodo = await response.json();

      setToDos((prevToDos) =>
        prevToDos.map((todo) => (todo.id === newTodo.id ? newTodo : todo))
      );
    } catch (error) {
      setError(error);
    }
  };

  const deleteToDo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/TodoList/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json;charset=utf-8" },
      });
      if (!response.ok) {
        throw new Error("Ошибка в запросе на сервер");
      }
      setToDos((prevToDos) => prevToDos.filter((toDos) => toDos.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  const createToDo = async (newToDo) => {
    try {
      const response = await fetch("http://localhost:3000/TodoList", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          title: newToDo,
        }),
      });
      if (!response.ok) {
        throw new Error("Ошибка в запросе на сервер");
      }
      const newTodo = await response.json();
      setToDos((prevToDos) => [...prevToDos, newTodo]);
    } catch (error) {
      setError(error);
    }
  };

  return {
    toDos,
    error,
    isLoading,
    fetchToDos,
    updateToDo,
    createToDo,
    deleteToDo,
  };
};
