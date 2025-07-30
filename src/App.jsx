import { useState, useEffect } from "react";
import { searchToDos, sortedToDos } from "./utils";
import { ToDoItem, FormCreateToDo, FormSearchSortToDo } from "./components";
import { useDebounce } from "./use-debounce";
import { ref, onValue, push, remove, set } from "firebase/database";
import { db } from "./fireBase";

export const App = () => {
  const [toDos, setToDos] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inputs, setInputs] = useState({
    newToDo: "",
    searchToDo: "",
  });
  const [sort, setSort] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const debouncedSearchToDo = useDebounce(inputs.searchToDo, 1000);

  const fetchSearchSortToDo = async (searchToDo) => {
    const toDosDBRef = ref(db, "todos");
    return onValue(toDosDBRef, (snapshot) => {
      const data = snapshot.val() || {};
      if (inputs.searchToDo) {
        setIsSort(true);
        const result = searchToDos(data, searchToDo);
        setToDos(data);
      } else {
        setToDos(data);
        // setIsSort(false);

        // const sortResult = sortedToDos(data);
        // if (sort) {
        //   setToDos(sortResult);
        // } else {
        //   setToDos(data);
        // }
      }

      setIsLoading(false);
    });

    // setIsLoading(true);
    // try {
    //   const response = await fetch("http://localhost:3000/TodoList");
    //   if (!response.ok) {
    //     throw new Error("Ошибка в запросе на сервер");
    //   }
    //   const data = await response.json();
    //   if (inputs.searchToDo) {
    //     setIsSort(true);
    //     const result = searchToDos(data, searchToDo);
    //     setToDos(result);
    //   } else {
    //     setIsSort(false);

    //     const sortResult = sortedToDos(data);
    //     if (sort) {
    //       setToDos(sortResult);
    //     } else {
    //       setToDos(data);
    //     }
    //   }
    //   setIsLoading(false);
    // } catch (error) {
    //   setError(error);
    // }
  };

  const updateToDo = async (id, payload) => {
    const toDODbRef = ref(db, `todos/${id}`);

    set(toDODbRef, {
      ...payload,
    });
    // try {
    //   const response = await fetch(`http://localhost:3000/TodoList/${id}`, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json;charset=utf-8" },
    //     body: JSON.stringify({
    //       ...payload,
    //     }),
    //   });
    //   if (!response.ok) {
    //     throw new Error("Ошибка в запросе на сервер");
    //   }
    //   const newTodo = await response.json();

    //   setToDos((prevToDos) =>
    //     prevToDos.map((todo) => (todo.id === newTodo.id ? newTodo : todo))
    //   );
    // } catch (error) {
    //   setError(error);
    // }
  };

  const deleteToDo = async (id) => {
    const toDoDBRef = ref(db, `todos/${id}`);

    remove(toDoDBRef);

    // try {
    //   const response = await fetch(`http://localhost:3000/TodoList/${id}`, {
    //     method: "DELETE",
    //     headers: { "Content-Type": "application/json;charset=utf-8" },
    //   });
    //   if (!response.ok) {
    //     throw new Error("Ошибка в запросе на сервер");
    //   }
    //   setToDos((prevToDos) => prevToDos.filter((toDos) => toDos.id !== id));
    // } catch (error) {
    //   setError(error);
    // }
  };

  const createToDo = async () => {
    setIsEditing(true);

    const toDosDBRef = ref(db, "todos");
    push(toDosDBRef, {
      title: inputs.newToDo,
    });

    // try {
    //   const response = await fetch("http://localhost:3000/TodoList", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json;charset=utf-8" },
    //     body: JSON.stringify({
    //       title: inputs.newToDo,
    //     }),
    //   });
    //   if (!response.ok) {
    //     throw new Error("Ошибка в запросе на сервер");
    //   }
    //   const newTodo = await response.json();
    //   setToDos((prevToDos) => [...prevToDos, newTodo]);
    //   setIsEditing(false);
    // } catch (error) {
    //   setError(error);
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSort = () => {
    setSort((prevState) => !prevState);
  };

  useEffect(() => {
    fetchSearchSortToDo(inputs.searchToDo);
  }, [inputs]);

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
            isEditing={isEditing}
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
          {Object.entries(toDos).map(([id, { title }]) => (
            <ToDoItem
              key={id}
              title={title}
              id={id}
              deleteToDo={deleteToDo}
              updateToDo={updateToDo}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
