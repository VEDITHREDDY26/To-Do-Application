import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {

    const inputRef = useRef();

    const [todoList,settodoList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")) : []);

    const add =()=>{
        const inputText = inputRef.current.value.trim();
        console.log(inputText);

        if(inputText === " "){
            return null;
        }
       
        const newTodo ={
            id:Date.now(),
            text:inputText,
            isComplete:  false,
        }

        settodoList((prev)=> [...prev,newTodo]);
        inputRef.current.value="";

    }

    const deleteTodo =(id)=>{
        settodoList((prevTodos)=>{
         return   prevTodos.filter((todo) => todo.id!==id)
        })
    }


    const toggle = (id)=>{
        settodoList((prevTodos)=>{
            return prevTodos.map((todo)=>{
                if(todo.id === id){
                     return {...todo,isComplete: !todo.isComplete}
                }
                return todo;
            })
        })
    }

    useEffect(()=>{
        console.log(todoList);
        localStorage.setItem("todos",JSON.stringify(todoList));
    },[todoList])




  return (
    <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
     min-h-screen flex items-center justify-center">

    <div className='bg-red-200 place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl '>
      
    {/* ---------------------title------------- */}
    <div className='flex items-center mt-7 gap-2'>
        <img className='w-8' src={todo_icon} alt="" />
        <h1 className='text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 '>To-Do List</h1>
    </div>

    {/*------------------input box ------------ */}
        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
            <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add your Task' />
            <button onClick={add} className='border-none rounded-full bg-blue-600 w-32 h-14 text-white text-lg font-medium curser-pointer'>Add Task</button>
        </div>

        {/* -------todolist----- */}
        <div >
            {todoList.map((item,index)=>{
                return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo}
                toggle={toggle}
                />
            })}
            
            {/* <TodoItems/>
            <TodoItems/> */}


        </div>

    </div>
    </div>
  )
}

export default Todo
