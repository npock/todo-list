import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [toDos, setToDos] = useState([]);
  useEffect(() => {
    setIsLoading(true);

    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((loadedData) => loadedData.json())
      .then((loadedProducts) => {
        setToDos(loadedProducts);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div>
        <h1>Todo List</h1>
        {isLoading ? (
          <div>...loading</div>
        ) : (
          <ul>
            {toDos.map(({ id, title }) => (
              <li key={id}>{title}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
