export const FormCreateToDo = ({ createToDo, inputs, handleChange }) => {
  return (
    <form onSubmit={createToDo}>
      <input
        name={name}
        placeholder="whrite important toDo..."
        value={inputs.newToDo}
        onChange={handleChange}
      />
      <button type="submit">add</button>
    </form>
  );
};
