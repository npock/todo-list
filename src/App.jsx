import { useState, useEffect } from "react";
import { searchToDos, sortedToDos } from "./utils";
import { ToDoItem, FormCreateToDo, FormSearchSortToDo } from "./components";
import { useDebounce } from "./use-debounce";

export const App = () => {
  const [toDos, setToDos] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    newToDo: "",
    searchToDo: "",
  });

  const [sort, setSort] = useState(false);
  const [isSort, setIsSort] = useState(false);

  const debouncedSearchToDo = useDebounce(inputs.searchToDo, 1000);

  const fetchSearchSortToDo = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/TodoList");
      if (!response.ok) {
        throw new Error("Ошибка в запросе на сервер");
      }
      const data = await response.json();
      const searchResult = searchToDos(data, inputs.searchToDo);
      const sortResult = sortedToDos(data);
      if (sort) {
        setToDos(sortResult);
      } else {
        if (inputs.searchToDo) {
          setIsSort(true);
        } else {
          setIsSort(false);
        }
        setToDos(searchResult);
      }
      setIsLoading(false);
    } catch (error) {
      setError(error);
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

  const handleSort = () => {
    setSort((prevState) => !prevState);
  };

  useEffect(() => {
    fetchSearchSortToDo();
  }, [sort, debouncedSearchToDo]);

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
    <>
      <div>
        <h1 style={{ display: "flex", justifyContent: "center" }}>Todo List</h1>
        <div
          style={{
            display: "block",
            width: "200px",
            margin: " auto",
          }}
        >
          <FormCreateToDo
            createToDo={createToDo}
            inputs={inputs}
            handleChange={handleChange}
          />
          <FormSearchSortToDo
            name="searchToDo"
            placeholder="search"
            value={inputs.searchToDo}
            isSort={isSort}
            onChange={handleChange}
            handleSort={handleSort}
          />
        </div>

        <ul>
          {toDos.map((todo) => (
            <ToDoItem
              key={todo.id}
              {...todo}
              deleteToDo={deleteToDo}
              updateToDo={updateToDo}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
