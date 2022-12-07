import React, { useState } from 'react';


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


        <table>
          <tbody>
            <tr><th>Description</th><th>Date</th></tr>
            {
              todos.map((desc, index) => <tr key={index}>
                <td>{desc.description}</td>
                <td>{desc.date}</td>
                <td><input type="button" value="Delete" onClick={()=> setTodos(todos.filter((desc, i) => i !== index))}/></td>
                </tr>
              )
            }
          </tbody>
        </table>   
      </div>
    );
  };

export default TodoList;