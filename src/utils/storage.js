const ToDoListKey = "to_do_list";

export const saveToDoList = (todoList) => {
  localStorage.setItem(ToDoListKey, JSON.stringify(todoList));
};

export const getToDoList = () => {
  return JSON.parse(localStorage.getItem(ToDoListKey));
};
