import React, { useState, useRef } from 'react';
import TodoTable from './TodoTable.js';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function TodoList() {
    const [desc, setDesc] = useState({description: '', date: '', priority: ''});
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();

    const columns = [
        { field: "description" , sortable: true, filter: true },
        { field: "date" , sortable: true, filter: true },
        { field: "priority" , sortable: true, filter: true,
          cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}}]
  
    const inputChanged = (event) => {
      setDesc({...desc, [event.target.name]: event.target.value});
    }
  
    const addTodo = (event) => {
      event.preventDefault();
      setTodos([...todos, desc]);
    }

    const deleteTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
        setTodos(todos.filter((desc, index) =>      
        index !== gridRef.current.getSelectedNodes()[0].childIndex));
        } else {
            alert('Select row first');
        }
    }
  
    return (
        <div className='App'>
        <input type="date" onChange={inputChanged} placeholder="Date" name="date" value={desc.date}/>
        <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={desc.description}/>
        <input type="text" onChange={inputChanged} placeholder="Priority" name="priority" value={desc.priority}/>
        <button onClick={addTodo}>Add</button>
        <button onClick={deleteTodo}>Delete</button>

        <div className="ag-theme-material"
           style={{height: '700px', width: '70%', margin: 'auto'}} >
            <AgGridReact 
                ref={gridRef} 
                onGridReady={ params => gridRef.current = params.api }
                rowSelection="single" 
                columnDefs={columns} 
                rowData={todos}>
            </AgGridReact>
        </div>
        <TodoTable todos={todos} setTodos={setTodos} />
      </div>
    );
  };

export default TodoList;