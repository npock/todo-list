import { useState, useEffect } from "react";
import { ToDoItem, FormCreateToDo, FormSearchSortToDo } from "./components";
//import { useData } from "./useData/useData";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "./store/createStore";

export const ToDos = () => {
  const [search, setSearh] = useState(false);
  const [sort, setSort] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [inputs, setInputs] = useState({ newToDo: "", searchToDo: "" });

  const todos = useSelector((state) => state.todos);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

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
    dispatch(fetchTodos(search, sort, inputs.searchToDo));
  }, [search, sort]);

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
        <h1>Todo List</h1>
        <FormCreateToDo inputs={inputs} handleChange={handleChange} />
        <FormSearchSortToDo
          inputs={inputs}
          cancel={cancel}
          handleChange={handleChange}
          handleSearch={handleSearch}
          handleCancel={handleCancel}
          handleSort={handleSort}
        />

        <ul>
          {todos.map((todo) => (
            <ToDoItem key={todo.id} {...todo} />
          ))}
        </ul>
      </div>
    </>
  );
};
