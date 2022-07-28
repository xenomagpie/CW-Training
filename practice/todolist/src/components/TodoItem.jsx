import React, { useState } from "react";

const TodoItem = ({ index, item, list, setList }) => {
  const [completed, setCompleted] = useState(false);

  const handleRemoveButtonClick = (indexOfItemToBeRemoved) => {
    setList([
      ...list.slice(0, indexOfItemToBeRemoved),
      ...list.slice(indexOfItemToBeRemoved + 1),
    ]);
  };

  return (
    <li
      style={{ textDecoration: completed ? "line-through" : "none" }}
      onDoubleClick={() => setCompleted(!completed)}
    >
      {item}
      <button onClick={() => handleRemoveButtonClick(index)}>Remove</button>
    </li>
  );
};

export default TodoItem;
