import { useState } from "react";
import PropTypes from "prop-types";
import Textfield from "./Textfield";

export default function TodoInput({ title, handleSave, handleCancel }) {
  const [value, setValue] = useState(title);

  return (
    <form
      className="list-group-item d-flex border border-dark"
      onSubmit={(event) => handleSave(event, value)}
    >
      <Textfield
        className="flex-grow-1"
        type="text"
        value={value}
        placeholder="Task Title"
        maxLength="25"
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        type="submit"
        className="btn btn-success ms-3"
        disabled={!value.length}
      >
        Save
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary ms-2"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </form>
  );
}

TodoInput.propTypes = {
  title: PropTypes.string,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

TodoInput.defaultProps = { title: "" };
