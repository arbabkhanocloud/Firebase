import React, { useState, useEffect } from "react";
import classes from "./todo-list.module.scss";
import TodoTitle from "./todo-title/todo-title";
import AddTodo from "./add-todo/add-todo";
import { getAllTodoDocuments } from "../../util/firebase/firebase.util";
import { TodoItem } from "./todo/todo";
import Todo from "./todo/todo";
import { updatetodoDocument } from "../../util/firebase/firebase.util";
import { deleteTodoDocumnet } from "../../util/firebase/firebase.util";
const TodoList: React.FC = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  useEffect(() => {
    const unsubscribe = getAllTodoDocuments((todoDocuments) => {
      setTodoList(todoDocuments);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleEdit = async (todo: TodoItem, subject: string) => {
    try {
      await updatetodoDocument(todo.id, { todoSubject: subject });
      console.log("successfully updated todo subject");
    } catch (error) {
      console.log("error while updating todo subject");
    }
  };

  const toggleComplete = async (todo: TodoItem) => {
    try {
      await updatetodoDocument(todo.id, { isCompleted: !todo.isCompleted });
      console.log("successfully toggled");
    } catch (error) {
      console.log("error while toggling todo");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodoDocumnet(id);
    } catch (error) {
      console.log("error while deleting the todo document", error);
    }
  };

  return (
    <div className={classes["todo-app"]}>
      <TodoTitle />
      <AddTodo />
      {todoList.length > 0 && (
        <div className={classes["todo-list"]}>
          {todoList.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
