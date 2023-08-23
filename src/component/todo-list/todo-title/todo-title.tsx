import React from "react";
import classes from "./todo-title.module.scss";

function TodoTitle() {
  return (
    <div className={classes["todo-title"]}>
      <h1>Todo Application</h1>
    </div>
  );
}

export default TodoTitle;
