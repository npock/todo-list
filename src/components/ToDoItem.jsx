import { useState } from "react";
//import { useData } from "../useData/useData";
import { useDispatch, useSelector } from "react-redux";
import { updateTodoAsync, deleteTodoAsync } from "../store/createStore";

export const ToDoItem = ({ title, id }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({
    title,
  });

  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  const deleteToDo = () => {
    dispatch(deleteTodoAsync(id));
  };

  const handleEdit = () => {
    setIsEdit((prevState) => !prevState);
  };

  const onSave = async () => {
    dispatch(updateTodoAsync(id, data)).finally(handleEdit);
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
            {isLoading ? <span>...deleting</span> : <li>{title}</li>}

            <button onClick={handleEdit}>update</button>

            <button
              style={{
                marginLeft: "10px",
              }}
              onClick={deleteToDo}
              disabled={isLoading}
            >
              delete
            </button>
          </div>
        )}
      </div>
    </>
  );
};
