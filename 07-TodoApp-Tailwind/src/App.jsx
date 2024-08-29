//import { useState } from 'react'
import './App.css'
import TodoForm from './components/TodoForm'


function App() {
  //const [count, setCount] = useState(0)

  return (
  <div className='bg-slate-950 w-screen h-screen  p-4 flex justify-center items-center flex-col'>
    <h1 className='text-4xl text-white mb-4 text-center'>Todo App</h1>
    <TodoForm />
  </div>
  )
}

export default App
