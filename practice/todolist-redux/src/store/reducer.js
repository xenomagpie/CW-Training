/* eslint-disable import/no-anonymous-default-export */
const defaultState = {
    inputValue: 'Hello Chuwa',
    list: []
}

export default (state = defaultState, action) => {

    if (action.type === 'CHANGE_INPUT_VALUE') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }

    if (action.type === 'ADD_TODO_ITEM') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue);
        return newState;
    }

    if (action.type === 'REMOVE_TODO_ITEM') {
        const newState = JSON.parse(JSON.stringify(state));
        const indexOfItemToBeRemoved = action.index;
        newState.list = [...state.list.slice(0, indexOfItemToBeRemoved), ...state.list.slice(indexOfItemToBeRemoved + 1)]
        return newState;
    }

    return state;
}