export default function TodoItem({ title, handleDelete, handleEdit }) {
  return (
    <li className="list-group-item d-flex justify-content-between border border-dark">
      <h6 className="mb-0 d-flex align-items-center">{title}</h6>
      <div className="d-flex">
        <div className="icon" onClick={handleEdit}>
          <i className="bi bi-pencil-fill"></i>
        </div>
        <div className="icon" onClick={handleDelete}>
          <i className="bi bi-trash-fill icon"></i>
        </div>
      </div>
    </li>
  );
}
