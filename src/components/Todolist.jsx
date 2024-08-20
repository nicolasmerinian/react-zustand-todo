import { useState } from 'react';
import { nanoid } from 'nanoid';
import Todo from "./Todo";
import { useTodoStore } from "../store";
import './Todolist.css';

const Todolist = () => {
    const [newTodo, setNewTodo] = useState('');
    const todos = useTodoStore((state) => state.todos);
    const addTodo = useTodoStore((state) => state.addTodo);
    const removeAllSelected = useTodoStore((state) => state.removeAllSelected);
    const removeTodo = useTodoStore((state) => state.removeTodo);
    const toggleCompleted = useTodoStore((state) => state.toggleCompleted);
    const toggleSelected = useTodoStore((state) => state.toggleSelected);
    const toggleSelectedAll = useTodoStore((state) => state.toggleSelectedAll);

    function handleChange(e) {
        const value = e.target.value;
        setNewTodo(value);
    }

    function handleCompleted(id) {
        toggleCompleted(id);
    }

    function handleDelete(id) {
        removeTodo(id);
    }

    function handleRemoveSelected() {
        removeAllSelected();
    }

    function handleSelectAll() {
        toggleSelectedAll();
    }

    function handleSelected(id) {
        toggleSelected(id);
    }

    function handleSubmit(e) {
        e.preventDefault();
        addTodo({ id: nanoid(), title: newTodo, completed: false });
        setNewTodo('');
    }

    return (
        <div className="Todolist">
            <form onSubmit={ handleSubmit }>
                <input type='text' value={ newTodo } onChange={ handleChange } />
                <button type='submit' disabled={ newTodo.trim() === '' }>Add</button>
            </form>
            <div className='todo-filters'>
                <button disabled={ todos.length === 0 } onClick={ handleSelectAll }>Toggle select all</button>
                <button disabled={ todos.filter(todo => todo.selected).length === 0 } onClick={ handleRemoveSelected }>Clear all selected</button>
            </div>
            <ul>
                { todos.map(todo => (
                    <Todo 
                        key={ todo.id } 
                        todo={ todo } 
                        handleCompleted={ handleCompleted }
                        handleDelete={ handleDelete }
                        handleSelected={ handleSelected }/>
                ))}
            </ul>
        </div>
    )
}

export default Todolist;