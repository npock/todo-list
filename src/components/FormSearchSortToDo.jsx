export const FormSearchSortToDo = ({
  handleSort,
  isSort,

  ...props
}) => {
  return (
    <>
      <input name={name} {...props} />

      <button
        disabled={isSort}
        style={{ marginLeft: "20px" }}
        onClick={handleSort}
      >
        sort
      </button>
    </>
  );
};
