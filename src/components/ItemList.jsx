import { useState } from "react";

export const ItemList = ({ todo, changeToDosList }) => {
  const [changeToDo, setChangeToDo] = useState(false);
  const [valueToDoChange, setValueToDoChange] = useState("");

  const handleValueChange = (e) => {
    setValueToDoChange(e.target.value);
  };

  const changeToInput = () =>
    changeToDo ? setChangeToDo(false) : setChangeToDo(true);

  const requestUpdate = (todo) => {
    fetch(`http://localhost:3000/TodoList/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: valueToDoChange,
        id: todo.id,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((updatedToDo) => {
        changeToDosList((prevToDos) =>
          prevToDos.map((todo) =>
            todo.id === updatedToDo.id ? updatedToDo : todo
          )
        );
      })
      .finally();
  };

  const requestDelete = (id) => {
    fetch(`http://localhost:3000/TodoList/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        changeToDosList((prevToDos) =>
          prevToDos.filter((toDos) => toDos.id !== id)
        );
      })
      .finally();
  };
  return (
    <>
      <li key={todo.id}>
        {changeToDo ? (
          <>
            <form onSubmit={() => requestUpdate(todo)}>
              <input
                placeholder="Введите изменения..."
                value={valueToDoChange}
                onChange={handleValueChange}
              />
              <button type="submit">изменить</button>
              <button onClick={changeToInput}>отменить</button>
            </form>
          </>
        ) : (
          <>
            {todo.title}
            <button onClick={() => changeToInput()}>изменить</button>
            <button onClick={() => requestDelete(todo.id)}>удалить</button>
          </>
        )}
      </li>
    </>
  );
};
