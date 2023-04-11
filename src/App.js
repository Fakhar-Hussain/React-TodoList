import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todoArray, setTodoArray] = useState([]);

  const AddData = () => {
    setTodoArray([todo , ...todoArray]);
    setTodo('');
    localStorage.setItem("todo", JSON.stringify([todo, ...todoArray]));
  }

  const RemoveAllData = () => {
    setTodoArray([]);
    localStorage.clear();
    setTodo("")
  }

  const RemoveItem = (id) => {
    let updatedList = todoArray.filter((item,index) => {
      return index !== id
    })
    localStorage.setItem("todo", JSON.stringify(updatedList))
    setTodoArray(updatedList);
  }

  useEffect( () => {
    let items = localStorage.getItem("todo")
    let data = JSON.parse(items);
    if (data !== null) {
      console.log(data);
      setTodoArray(data)
    }
  },[])

  return (
    <div className="App">
      <div className="header">
        <span>welcome to our new project</span>
        <h2>Todo List</h2>
      </div>

      <div className="main-content">
        <input value={todo} onChange={(e) => setTodo(e.currentTarget.value)} type="text" placeholder="Add Todo Item's Here" className="inputField" />
        <button onClick={AddData} className="addBtn">Add Todo's</button>
        <button onClick={RemoveAllData} className="deleteAllBtn">Remove All</button>
        <hr className="longHR" />
      </div>


      {
        todoArray.map( (item , index) => {
          return(
            <div key={index}>
              <div  className="contents">
                <p className="todoTxt">{item}</p>
                <button onClick={() => RemoveItem(index)} className="deleteBtn">Remove Todo</button>
              </div>
                <br/>
                <hr className="shortHR"  />
            </div>
          )
        })
      }

      <br />
    </div>
  );
}

export default App;
