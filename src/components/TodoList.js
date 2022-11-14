import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

export default function TodoList({
  filteredList,
  handleDelete,
  handleEdit,
  editItem,
  handleSave,
  handleCancel,
}) {
  return (
    <>
      {editItem && !editItem.id && (
        <TodoInput
          title={editItem.title}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      )}
      {!!filteredList?.length &&
        filteredList.map((item) =>
          editItem && item.id === editItem.id ? (
            <TodoInput
              title={editItem.title}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
          ) : (
            <TodoItem
              key={item.id}
              id={item.id}
              title={item.title}
              handleDelete={() => handleDelete(item.id)}
              handleEdit={() => handleEdit(item)}
            />
          )
        )}
    </>
  );
}
