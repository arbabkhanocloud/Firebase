import React, { useState } from "react";
import classes from "./add-todo.module.scss";
import Button from "../../button/button.component";
import { createTodoDocument } from "../../../util/firebase/firebase.util";

function AddTodo() {
  const [todoSubject, setTodoSubject] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createTodoDocument(todoSubject);
      setTodoSubject("");
    } catch (error) {
      console.log("Error while adding Todo", error);
    }
  };
  return (
    <div className={classes["add-todo"]}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={classes["todo-input"]}
          value={todoSubject}
          placeholder="What do you want to do?"
          onChange={(e) => setTodoSubject(e.target.value)}
        />
        <div className={classes["addtodo-button"]}>
          <Button type="submit" buttonType="google">
            Add Todo
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;
