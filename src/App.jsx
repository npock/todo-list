import { useState, useEffect } from "react";
import {
  ItemList,
  FormAddToDo,
  FormSearchToDo,
  ButtonSort,
} from "./components";

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toDos, setToDos] = useState([]);
  const [inputs, setInputs] = useState({
    addTodo: "",
    searchToDo: "",
  });
  const [sort, setSort] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const changeToDosList = (todos) => {
    setToDos(todos);
  };

  const sortedToDos = toDos.slice().sort((a, b) => {
    const aValue = a.title;
    const bValue = b.title;
    return aValue.localeCompare(bValue);
  });

  const handleSort = () => {
    if (sort) {
      setSort(false);
    } else {
      setToDos(sortedToDos);
      setSort(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/TodoList")
      .then((loadedData) => loadedData.json())
      .then((loadedToDos) => {
        changeToDosList(loadedToDos);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div>
        <h1>Todo List</h1>
        <FormAddToDo
          name="addTodo"
          label="addTodo"
          placeholder="Введите важное дело на сегодня..."
          type="text"
          value={inputs.addTodo}
          changeToDosList={changeToDosList}
          onChange={handleChange}
        />
        <FormSearchToDo
          name="searchToDo"
          label="searchToDo"
          placeholder="Поиск..."
          type="text"
          value={inputs.searchToDo}
          changeToDosList={changeToDosList}
          onChange={handleChange}
        ></FormSearchToDo>
        <ButtonSort handleSort={handleSort} />
        {isLoading ? (
          <div>...loading</div>
        ) : (
          <ul>
            {toDos.map((todo) => (
              <ItemList todo={todo} changeToDosList={changeToDosList} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
