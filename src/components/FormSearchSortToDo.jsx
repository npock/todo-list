import { use } from "react";
import { AppContext } from "../context";

export const FormSearchSortToDo = () => {
  const {
    handleChange,
    handleSearch,
    handleCancel,
    handleSort,
    cancel,
    inputs,
  } = use(AppContext);
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
