import React, { useState } from "react";
import { connect } from "react-redux";

const TodoItem = (props) => {
  const { item, index } = props;
  const [completed, setCompleted] = useState(false);

  return (
    <li
      style={{ textDecoration: completed ? "line-through" : "none" }}
      onDoubleClick={() => setCompleted(!completed)}
    >
      {item}
      <button onClick={() => props.handleRemoveButtonClick(index)}>
        Remove
      </button>
    </li>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleRemoveButtonClick(index) {
      const action = {
        type: "REMOVE_TODO_ITEM",
        index: index,
      };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatchToProps)(TodoItem);
