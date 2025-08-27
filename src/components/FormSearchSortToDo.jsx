export const FormSearchSortToDo = ({
  handleSearch,
  handleCancel,
  handleSort,
  cancel,
  handleChange,
  inputs,
}) => {
  return (
    <>
      <input
        name="searchToDo"
        placeholder="search"
        value={inputs.searchToDo}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>search</button>
      {cancel ? (
        <button onClick={handleCancel}>cancel</button>
      ) : (
        <button style={{ marginLeft: "20px" }} onClick={handleSort}>
          sort
        </button>
      )}
    </>
  );
};
