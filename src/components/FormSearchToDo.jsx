export const FormSearchToDo = ({ notFound, ...props }) => {
  return (
    <>
      <form>
        <input {...props} />
        {notFound ? <span>ничего не найдено</span> : null}
      </form>
    </>
  );
};
