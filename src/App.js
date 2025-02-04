import './App.css';
import HEADER from './MyComponents/header';
import {Todos} from './MyComponents/Todos';
import {Footer} from './MyComponents/Footer';
import {Addtodo} from './MyComponents/Addtodo';
import {About} from './MyComponents/About';
import React, { useState , useEffect} from 'react';
import {
  BrowserRouter as ROUTER,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo = [];
  }else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    console.log("I am on delete of todo", todo);
    setTodos(todos.filter((e)=>{
        return e!==todo;
    }));
    localStorage.setItem("todos" , JSON.stringify(todos));
  }
   const addTodo = (title , desc)=>{
    console.log('checking', title, desc);
    let sno;
    if(todos.length === 0){
      sno = 0;
    }else{
      
      sno = todos[todos.length-1].sno + 1;
    }
    
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos ,myTodo]);
    console.log(myTodo);   
   }

  const [todos, setTodos] = useState(initTodo);
  
  useEffect(() => {
    localStorage.setItem("todos" , JSON.stringify(todos));
   }, [todos]);

  return (
    <>
    <ROUTER>
        <HEADER title="My Todo's List" searchBar={false} />
        <Switch>
          
        <Route exact path="/" render={()=> {
          return(
            <>
               <Addtodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete}/>
            </>
          )
        }}>
           </Route>
          <Route exact path="/about">
            <About />
          </Route>
          
        </Switch>
       
        <Footer />
    </ROUTER>
    </>
  );
}

export default App;
