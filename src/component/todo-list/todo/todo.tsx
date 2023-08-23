import classes from "./todo.module.scss";

import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export interface TodoItem {
  id: string;
  todoSubject: string;
  isCompleted: boolean;
  createdAt: Date;
}

interface TodoProps {
  todo: TodoItem;
  toggleComplete: (todo: TodoItem) => void;
  handleDelete: (id: string) => void;
  handleEdit: (todo: TodoItem, newTitle: string) => void;
}

const Todo: React.FC<TodoProps> = ({
  todo,
  toggleComplete,
  handleDelete,
  handleEdit,
}) => {
  const [newTitle, setNewTitle] = useState(todo.todoSubject);

  const handleChange = (e: any) => {
    e.preventDefault();
    if (todo.isCompleted === true) {
      setNewTitle(todo.todoSubject);
    } else {
      todo.todoSubject = "";
      setNewTitle(e.target.value);
    }
  };
  return (
    <div className={classes["todo"]}>
      <input
        style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}
        type="text"
        value={todo.todoSubject === "" ? newTitle : todo.todoSubject}
        className={classes["list"]}
        onChange={handleChange}
      />
      <div className={classes["list-button"]}>
        <button onClick={() => toggleComplete(todo)}>
          <CheckCircleIcon id="i" />
        </button>
        <button onClick={() => handleEdit(todo, newTitle)}>
          <EditIcon id="i" />
        </button>
        <button onClick={() => handleDelete(todo.id)}>
          <DeleteIcon id="i" />
        </button>
      </div>
    </div>
  );
};

export default Todo;
