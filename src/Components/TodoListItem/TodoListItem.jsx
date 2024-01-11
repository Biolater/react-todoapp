import "./TodoListItem.css";
import { useState } from "react";
const TodoListItem = ({ text, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const sendText = (text) => {
    onEdit(text);
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    if (editedText.trim("") !== "") {
      saveText();
    } else {
      alert("Please enter something");
    }
  };
  const handleInput = (e) => {
    setEditedText(e.target.value);
  };

  const saveText = () => {
    sendText(editedText);
    setIsEditing(false);

  };

  return (
    <>
      {isEditing && (
        <div className="edit">
          <input
            type="text"
            onChange={(e) => handleInput(e)}
            placeholder="Please enter new task"
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      )}
      {!isEditing && (
        <div className="todolist-item">
          <p className="todolist__item-content">{text}</p>
          <div className="todolist__item-buttons">
            <button className="edit-button" onClick={handleEditClick}>
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button className="delete-button" onClick={onDelete}>
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoListItem;
