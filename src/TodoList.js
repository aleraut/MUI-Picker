import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


function TodoList() {
    const [desc, setDesc] = useState({description: '', date: '', priority: ''});
    const [todos, setTodos] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const gridRef = useRef();

    const columns = [
        { field: "description" , sortable: true, filter: true },
        { field: "date" , sortable: true, filter: true },
        { field: "priority" , sortable: true, filter: true,
          cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}}]
  
    const inputChanged = (event) => {
      setDesc({...desc, [event.target.name]: event.target.value});
    };
  
    const addTodo = (event) => {
      event.preventDefault();
      setTodos([...todos, desc]);
    };

    const deleteTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
        setTodos(todos.filter((desc, index) =>      
        index !== gridRef.current.getSelectedNodes()[0].childIndex));
        } else {
            alert('Select row first');
        }
    };

      const handleDateChange = (newValue) => {
        const newSelectedDate = newValue.toString();
        setSelectedDate(newSelectedDate)
        setDesc({...desc, date: newSelectedDate})      
    };
  
    return (
        <div className='App'>
        <LocalizationProvider dateAdapter={AdapterMoment}>
        <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
        <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/DD/YYYY"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <TextField type="text" onChange={inputChanged} placeholder="Description" name="description" value={desc.description}/>
        <TextField type="text" onChange={inputChanged} placeholder="Priority" name="priority" value={desc.priority}/>
        <Button onClick={addTodo} variant="contained">Add</Button>
        <Button onClick={deleteTodo} variant="contained">Delete</Button>
        </Stack>
        </LocalizationProvider>

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
      </div>
    );
  };

export default TodoList;