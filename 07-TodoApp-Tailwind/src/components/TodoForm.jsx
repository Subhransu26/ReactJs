import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    if (todo.trim()) {
      if (editId) {
        // Editing an existing todo
        setTodos(
          todos.map((item) =>
            item.id === editId ? { ...item, text: todo } : item
          )
        );
        setEditId(null);
      } else {
        // Adding a new todo
        setTodos([...todos, { id: Date.now(), text: todo, isCompleted: false }]);
      }
      setTodo(""); // Clear the input field
    }
  };


  const handleEdit = (id) => {
    const toEdit = todos.find((item => item.id === id));
    setTodo(toEdit.text)
    setEditId(id)
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <nav className="w-full max-w-4xl h-auto bg-slate-600 min-h-[80vh] mx-auto p-5 rounded-lg">
      <div className="flex justify-center">
        <input
          onChange={handleChange}
          value={todo}
          className="w-full max-w-xl p-2 rounded-md border hover:border-indigo-600"
          type="text"
          placeholder="Add item..."
        />
        <button
          onClick={handleAdd}
          className="ml-5 bg-indigo-400 p-2 rounded-md text-white font-semibold text-xl hover:bg-indigo-500"
        >
          ADD
        </button>
      </div>
      <div className="mt-8">
        <h1 className="text-xl text-white font-bold text-center">Your Todos</h1>
        <div className="w-full h-[1px] border-b-2 border-slate-400 rounded-3xl mt-2"></div>
        <div className="Todos mt-5">
          {todos.map((item) => (
            <div key={item.id} className="mt-4 flex flex-col md:flex-row items-center text-white">
              <input
                className="md:ml-3"
                type="checkbox"
                checked={item.isCompleted}
                onChange={() =>
                  setTodos(
                    todos.map((todoItem) =>
                      todoItem.id === item.id
                        ? { ...todoItem, isCompleted: !todoItem.isCompleted }
                        : todoItem
                    )
                  )
                }
              />
              <div className={`ml-3 mt-2 md:mt-0 w-full max-w-full ${item.isCompleted ? "line-through" : ""}`}>
                {item.text}
              </div>
              <div className="buttons mt-2 md:mt-0 md:ml-5 gap-5 flex   " >
                {/* Edit */}
                <button
                  onClick={() => handleEdit(item.id)}
                  className="rounded-md text-indigo-200 font-semibold text-xl hover:text-indigo-500"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                {/* Delete */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-md text-indigo-200 font-semibold text-xl hover:text-indigo-500"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default TodoForm;

