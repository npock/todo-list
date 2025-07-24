import { useState } from "react";

export const ToDoItem = ({ title, id, deleteToDo, updateToDo }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({
    title,
  });

  const onDelete = async () => {
    setIsDeleting(true);
    await deleteToDo(id);
    setIsDeleting(false);
  };

  const handleEdit = () => {
    setIsEdit((prevState) => !prevState);
  };

  const onSave = () => {
    updateToDo(id, data).finally(() => handleEdit());
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <div>
        {isEdit ? (
          <div>
            <input value={data.title} name="title" onChange={onChange} />
            <button onClick={onSave}> save</button>
            <button onClick={handleEdit}> cancel</button>
          </div>
        ) : (
          <div
            style={{
              marginBottom: "15px",
              marginLeft: "50px",
              display: "flex",
            }}
          >
            {isDeleting ? <span>...deleting</span> : <li>{title}</li>}

            <button onClick={handleEdit}>update</button>

            <button
              style={{
                marginLeft: "10px",
              }}
              onClick={onDelete}
              disabled={isDeleting}
            >
              delete
            </button>
          </div>
        )}
      </div>
    </>
  );
};
