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
  const [sort, setSort] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [inputs, setInputs] = useState({
    addTodo: "",
    searchToDo: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const changeToDosList = (todos) => {
    setToDos(todos);
  };

  const handleSort = () => {
    if (sort) {
      setSort(false);
    } else {
      setSort(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/TodoList")
      .then((loadedData) => loadedData.json())
      .then((loadedToDos) => {
        const result = loadedToDos.filter(({ title, id }) => {
          let regex = new RegExp(
            `\\b(${inputs.searchToDo}|${inputs.searchToDo}\\w*)\\b`,
            "i"
          );
          let resultRegex = regex.test(title);
          if (resultRegex) {
            return { title, id };
          }
        });
        if (inputs.searchToDo !== "") {
          if (result.length === 0) {
            setNotFound(true);
          } else {
            setNotFound(false);
          }
          changeToDosList(result);
        } else if (sort) {
          const sortedToDos = loadedToDos.slice().sort((a, b) => {
            const aValue = a.title;
            const bValue = b.title;
            return aValue.localeCompare(bValue);
          });

          changeToDosList(sortedToDos);
        } else {
          changeToDosList(loadedToDos);
        }
      })
      .finally(() => setIsLoading(false));
  }, [inputs, sort]);

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
          notFound={notFound}
          value={inputs.searchToDo}
          onChange={handleChange}
        />
        <ButtonSort handleSort={handleSort} />
        {isLoading ? (
          <div>...loading</div>
        ) : (
          <ul>
            {toDos.map((todo) => (
              <ItemList
                key={todo.id}
                todo={todo}
                changeToDosList={changeToDosList}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
