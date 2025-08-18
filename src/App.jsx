import { useState, useEffect } from "react";

import { ToDoItem, FormCreateToDo, FormSearchSortToDo } from "./components";
import { AppContext } from "./context";
import { useData } from "./useData/useData";

export const App = () => {
  const [inputs, setInputs] = useState({
    newToDo: "",
    searchToDo: "",
  });
  const [search, setSearh] = useState(false);
  const [sort, setSort] = useState(false);
  const [cancel, setCancel] = useState(false);

  const {
    toDos,
    error,
    isLoading,
    fetchToDos,
    updateToDo,
    createToDo,
    deleteToDo,
  } = useData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSearch = () => {
    setCancel(true);
    setSearh((prevState) => !prevState);
  };

  const handleCancel = () => {
    setSearh((prevState) => !prevState);
    setInputs({ ...inputs, searchToDo: "" });
    setCancel(false);
  };
  const handleSort = () => {
    setSort((prevState) => !prevState);
  };
  useEffect(() => {
    fetchToDos(inputs, search, sort);
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
    <AppContext
      value={{
        deleteToDo,
        updateToDo,
        createToDo,
        handleChange,
        handleSearch,
        handleCancel,
        handleSort,
        inputs,
        cancel,
      }}
    >
      <>
        <div>
          <h1>Todo List</h1>
          <FormCreateToDo />
          <FormSearchSortToDo />
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
