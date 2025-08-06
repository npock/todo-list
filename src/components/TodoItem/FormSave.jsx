import { useContext } from "react";
import { AppContext } from "../../context";

export const FormSave = ({ title, onChange, handleEdit, id, data }) => {
  const { updateToDo } = useContext(AppContext);

  const onSave = async () => {
    await updateToDo(id, data).finally(() => handleEdit());
  };

  return (
    <div>
      <input value={title} name="title" onChange={onChange} />
      <button onClick={onSave}> save</button>
      <button onClick={handleEdit}> cancel</button>
    </div>
  );
};
