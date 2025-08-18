import { useState } from "react";
import { use } from "react";
import { AppContext } from "../../context";

export const FormToDoUpdateDelete = ({ id, title, handleEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLong, setIsLong] = useState(false);
  const { deleteToDo } = use(AppContext);

  const handleLongShort = () => {
    setIsLong((prevState) => !prevState);
  };

  const onDelete = async () => {
    setIsDeleting(true);
    await deleteToDo(id);
    setIsDeleting(false);
  };

  const shortLongTitle = (title) => {
    if (title.length > 20 && !isLong) {
      const newTitle = title.slice(0, 20);
      return newTitle + "...";
    }
    return title;
  };

  return (
    <div>
      {isDeleting ? (
        <span>...deleting</span>
      ) : (
        <li onClick={handleLongShort}>{shortLongTitle(title)}</li>
      )}

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
