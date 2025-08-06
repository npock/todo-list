import { useState, useEffect } from "react";
import { searchToDos, sortedToDos } from "./utils";
import { ToDoItem, FormCreateToDo, FormSearchSortToDo } from "./components";
import { AppContext } from "./context";

export const App = () => {
  const [toDos, setToDos] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    newToDo: "",
    searchToDo: "",
  });
  const [search, setSearh] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [sort, setSort] = useState(false);
  const [cancel, setCancel] = useState(false);

  const fetchToDos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/TodoList");
      if (!response.ok) {
        throw new Error("Ошибка в запросе на сервер");
      }
      const data = await response.json();
      if (isSearch) {
        setIsSearch(false);

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

  const createToDo = async () => {
    try {
      const response = await fetch("http://localhost:3000/TodoList", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          title: inputs.newToDo,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSearch = () => {
    setIsSearch(true);
    setCancel(true);
    setSearh((prevState) => !prevState);
  };

  const handleCancel = () => {
    setIsSearch(false);
    setSearh((prevState) => !prevState);
    setInputs({ ...inputs, searchToDo: "" });
    setCancel(false);
  };
  const handleSort = () => {
    setSort((prevState) => !prevState);
  };

  useEffect(() => {
    fetchToDos();
  }, [sort, search]);

  if (isLoading) {
    return (
      <>
        <h1>...loading</h1>
      </>
    );
  }
  if (error) {
    return (
      <>
        <h1>{error}</h1>
      </>
    );
  }

  return (
    <AppContext value={{ deleteToDo, updateToDo }}>
      <>
        <div>
          <h1>Todo List</h1>
          <FormCreateToDo
            createToDo={createToDo}
            inputs={inputs}
            handleChange={handleChange}
          />
          <FormSearchSortToDo
            name="searchToDo"
            placeholder="search"
            value={inputs.searchToDo}
            cancel={cancel}
            onChange={handleChange}
            handleSearch={handleSearch}
            handleCancel={handleCancel}
            handleSort={handleSort}
          />
          <ul>
            {toDos.map((todo) => (
              <ToDoItem key={todo.id} {...todo} />
            ))}
          </ul>
        </div>
      </>
    </AppContext>
  );
};
