import { useEffect } from "react";
export const FormSearchToDo = ({ value, changeToDosList, ...props }) => {
  useEffect(() => {
    fetch("http://localhost:3000/TodoList")
      .then((loadedData) => loadedData.json())
      .then((loadedToDos) => {
        const result = loadedToDos.filter(({ title, id }) => {
          let regex = new RegExp(`\\b(${value}|${value}\\w*)\\b`, "i");
          let resultRegex = regex.test(title);
          if (resultRegex) {
            return { title, id };
          }
        });
        changeToDosList(result);
      })
      .finally();
  }, [value]);

  return (
    <form>
      <input {...props} />
    </form>
  );
};
