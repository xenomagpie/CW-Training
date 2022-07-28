import React, { Fragment, useState, useRef } from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("Hello Chuwa");

  const textInput = useRef(null);

  const focusInput = () => {
    textInput.current.focus();
  };

  const addTodoItem = (newTodoItem) => {
    setList([...list, newTodoItem]);
    setInputValue("");
  };

  return (
    <Fragment>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          ref={textInput}
        />
        <button
          onClick={() => {
            focusInput();
            addTodoItem(inputValue);
          }}
        >
          Add
        </button>
      </div>
      <ul>
        {list.map((item, index) => {
          return (
            <TodoItem
              index={index}
              item={item}
              key={`${index}-${item}`}
              list={list}
              setList={setList}
            />
          );
        })}
      </ul>
    </Fragment>
  );
};

export default TodoList;
