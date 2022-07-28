const handleAddTodoItemButtonClicked = () => {
    const textInput = document.querySelector("input");
    const TodoItemUL = document.querySelector("ul");
    const newTodoItemLi = createTodoItemLi(textInput.value);
    TodoItemUL.appendChild(newTodoItemLi);
    textInput.value = "";
    textInput.focus();
};

const handleRemoveButtonClicked = (TodoItemLiToRemove) => {
    const TodoItemUL = document.querySelector("ul");
    TodoItemUL.removeChild(TodoItemLiToRemove);
};

const handleTdooItemComplete = (TodoItemLi) => {
    if (!TodoItemLi.classList.contains("completed"))
        TodoItemLi.classList.add("completed");
    else
        TodoItemLi.classList.remove("completed");
};

const createInput = () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = "Hello Chuwa";
    return input;
};

const createAddTodoItemButton = () => {
    const button = document.createElement("button");
    button.textContent = "Add";
    button.onclick = handleAddTodoItemButtonClicked;
    return button;
};

const createTodoItemLi = (item) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.ondblclick = (e => handleTdooItemComplete(e.target));
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = (e => handleRemoveButtonClicked(e.target.parentElement));
    li.appendChild(removeButton);
    return li;
};

const createTodoItemUL = () => document.createElement("ul");

const TodoList = document.querySelector(".todo-list");
TodoList.append(createInput(), createAddTodoItemButton(), createTodoItemUL());