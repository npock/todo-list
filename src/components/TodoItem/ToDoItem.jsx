import { useState } from "react";
import { FormSave } from "../TodoItem/FormSave";
import { FormToDoUpdateDelete } from "./FormUpdateDeleteToDo";

export const ToDoItem = ({ title, id }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({
    title,
  });

  const handleEdit = () => {
    setIsEdit((prevState) => !prevState);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <div>
        {isEdit ? (
          <FormSave
            title={data.title}
            onChange={onChange}
            handleEdit={handleEdit}
            id={id}
            data={data}
          />
        ) : (
          <FormToDoUpdateDelete
            id={id}
            title={data.title}
            handleEdit={handleEdit}
          />
        )}
      </div>
    </>
  );
};
