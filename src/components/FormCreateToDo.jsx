import { createTodoAsync } from "../store/createStore";
import { useDispatch } from "react-redux";

export const FormCreateToDo = ({ inputs, handleChange }) => {
  const dispatch = useDispatch();

  const createToDo = () => {
    dispatch(createTodoAsync(inputs.newToDo));
  };

  return (
    <form onSubmit={() => createToDo(inputs.newToDo)}>
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
