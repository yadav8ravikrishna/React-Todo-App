
import './App.css';
import Header from './myComponents/Header';
import {Footer} from './myComponents/Footer';
import {Todos}  from './myComponents/Todos';
import {AddTodos} from './myComponents/AddTodos';
import { About } from './myComponents/About';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState,useEffect } from 'react';



function App() {

  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }


const onDelete= (todo)=>{
  console.log("I am on delete of todo",todo);
  // Deleting this way in react does not work
    // let index = todos.indexOf(todo);
    // todos.splice(index, 1);

    setTodos(todos.filter((e)=>{
      return e!==todo;
    }));
    console.log("deleted", todos)
    localStorage.setItem("todos", JSON.stringify(todos));
}
const addTodo = (title, desc) => {
  console.log("I am adding this todo", title, desc)
  let sno;
  if (todos.length === 0) {
    sno = 0;
  }
  else {
    sno = todos[todos.length - 1].sno + 1;
  }

  const myTodo = {
    sno: sno,
    title: title,
    desc: desc,
  }
  setTodos([...todos, myTodo]);
  console.log(myTodo);
}

  let [todos,setTodos] =useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <BrowserRouter>
    <Header title="my Todos List"/>
    <Routes>
          <Route path="/" element= {
            <>
            <AddTodos addTodo={addTodo} />
            <Todos todos={todos} onDelete={onDelete} /> 
            </>
          }/> 
          <Route path="/about" element={<About />}/>
        </Routes> 
    <Footer/>
    </BrowserRouter>
  );
}
export default App;
