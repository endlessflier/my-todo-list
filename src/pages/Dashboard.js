import { useState, useEffect, useMemo } from "react";
import { nanoid } from "nanoid";
import Textfield from "../components/Textfield";
import TodoList from "../components/TodoList";
import { saveToDoList } from "../utils/storage";
import { orderBy } from "lodash";

export default function Dashboard({ todoList: initTodoList }) {
  const [todoList, setTodoList] = useState(initTodoList);
  const [editItem, setEditItem] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    saveToDoList(todoList);
  }, [todoList]);

  const filteredList = useMemo(() => {
    const filteredData = todoList.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    return orderBy(filteredData, "updatedAt", "desc");
  }, [todoList, search]);

  const handleEdit = (selectedItem) => {
    setEditItem(selectedItem);
  };

  const handleEditCancel = () => {
    setEditItem(null);
  };

  const handleSave = (event, title) => {
    event.preventDefault();
    const newItem = {
      id: editItem.id ?? nanoid(),
      title,
      updatedAt: Math.round(new Date().getTime() / 1000),
    };

    const updatedItems = editItem.id
      ? todoList.map((item) => (item.id === newItem.id ? newItem : item))
      : [...todoList, newItem];

    setTodoList(updatedItems);
    setEditItem(null);
  };

  const handleDelete = (id) => {
    const filteredItems = todoList.filter((item) => item.id !== id);
    setTodoList(filteredItems);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-10 col-md-8 mx-auto mt-4">
          <h2 className="text-capitalize text-center">My To-Do List</h2>
          <ul className="list-group rounded-4 outline my-5">
            <div className="list-group-item d-flex border border-dark">
              <Textfield
                className="flex-grow-1"
                type="text"
                icon={<i className="bi bi-search"></i>}
                value={search}
                placeholder="Search"
                maxLength="25"
                rounded
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-primary ms-3"
                onClick={() => setEditItem({ id: null, title: "" })}
              >
                New
              </button>
            </div>
            <TodoList
              filteredList={filteredList}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              editItem={editItem}
              handleSave={handleSave}
              handleCancel={handleEditCancel}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
