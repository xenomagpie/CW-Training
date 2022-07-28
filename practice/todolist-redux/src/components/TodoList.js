import React, { Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import TodoItem from './TodoItem'

const TodoList = (props) => {

    const textInput = useRef(null);

    const focusInput = () => {
        textInput.current.focus();
    };

    return (
        <Fragment>
            <div>
                <input value={props.inputValue} onChange={(e) => props.changeInputValue(e)} ref={textInput} />
                <button onClick={() => { focusInput(); props.addTodoItem(); }}>Add</button>
            </div>
            <ul>
                {
                    props.list.map((item, index) => {
                        return <TodoItem item={item} key={`${index}-${item}`} index={index} />
                    })
                }
            </ul>
        </Fragment>
    )
};



const mapStateToProps = (state) => {
    return {
        inputValue: state.inputValue,
        list: state.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeInputValue(e) {
            const action = {
                type: 'CHANGE_INPUT_VALUE',
                value: e.target.value
            }
            dispatch(action);
        },

        addTodoItem() {
            dispatch({
                type: 'ADD_TODO_ITEM'
            });

            dispatch({
                type: 'CHANGE_INPUT_VALUE',
                value: ""
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);