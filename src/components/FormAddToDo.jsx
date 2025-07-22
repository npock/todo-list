import { generateRandomId } from "../utils";

export const FormAddToDo = ({ value, changeToDosList, ...props }) => {
  const requestAddToDo = () => {
    fetch("http://localhost:3000/TodoList", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: value,
        id: generateRandomId(20),
      }),
    })
      .then((response) => response.json())
      .then((newToDo) => {
        changeToDosList((prevToDos) => [...prevToDos, newToDo]);
      })
      .finally();
  };

  return (
    <form onSubmit={requestAddToDo}>
      <input {...props} />
      <button type="submit">Добавить</button>
    </form>
  );
};
