import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context";

export const FormToDoUpdateDelete = ({ id, title, handleEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteToDo } = useContext(AppContext);

  const onDelete = async () => {
    setIsDeleting(true);
    await deleteToDo(id);
    setIsDeleting(false);
  };

  return (
    <div>
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
  );
};
