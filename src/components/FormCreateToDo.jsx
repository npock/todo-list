import { use } from "react";
import { AppContext } from "../context";

export const FormCreateToDo = () => {
  const { createToDo, handleChange, inputs } = use(AppContext);
  return (
    <form onSubmit={createToDo}>
      <input
        name="newToDo"
        placeholder="whrite important toDo..."
        value={inputs.newToDo}
        onChange={handleChange}
      />
      <button type="submit">add</button>
    </form>
  );
};
