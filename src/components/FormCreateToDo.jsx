export const FormCreateToDo = ({
  isEdeting,
  createToDo,
  inputs,
  handleChange,
}) => {
  return (
    <form onSubmit={createToDo}>
      <input
        name="newToDo"
        placeholder="whrite important toDo..."
        value={inputs.newToDo}
        onChange={handleChange}
      />
      <button disabled={isEdeting} type="submit">
        add
      </button>
    </form>
  );
};
