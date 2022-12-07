import React, { useState } from 'react';
import TodoTable from './TodoTable.js';


function TodoList() {
    const [desc, setDesc] = useState({description: '', date: ''});
    const [todos, setTodos] = useState([]);
  
    const inputChanged = (event) => {
      setDesc({...desc, [event.target.name]: event.target.value});
    }
  
    const addTodo = (event) => {
      event.preventDefault();
      setTodos([...todos, desc]);
    }
  
    return (
      <div>
        <h2>Simple Todolist</h2>
        <p>Add todo:</p>
        <form onSubmit={addTodo}>
        <label>Description:</label>
        <input name='description' type="text" onChange={inputChanged} value={desc.description}/>
        <label>Date:</label>
        <input name='date' type="text" onChange={inputChanged} value={desc.date}/>
        <input type='submit' value='Add' />
        </form> 
        <TodoTable todos={todos} setTodos={setTodos} />
      </div>
    );
  };

export default TodoList;