import React from 'react';

export default function TodoTable (props) {
    return (
    <div>
    <table>
          <tbody>
            <tr><th>Description</th><th>Date</th><th>Priority</th></tr>
            {
              props.todos.map((desc, index) => <tr key={index}>
                <td>{desc.description}</td>
                <td>{desc.date}</td>
                <td>{desc.priority}</td>
                <td><input type="button" value="Delete" onClick={()=> props.setTodos(props.todos.filter((desc, i) => i !== index))}/></td>
                </tr>
              )
            }
          </tbody>
        </table>   
      </div>
    )
}