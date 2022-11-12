import React, { useState, useRef } from "react";
import { AiOutlineDelete, AiOutlineMenu } from "react-icons/ai";

export default function TodoList() {
  const [activeObject, setactiveObject] = useState(null);
  const [todoInputText, setTodoInputText] = useState("");
  const [todos, setTodos] = useState([
    {
        id:1,
      todo: "Making a video!",
      complete: true,
      isDragging: false,
    },
    {
        id:7,
      todo: "Making a website!",
      complete: false,
      isDragging: false,
    },
    {
        id:8,
      todo: "Making another website!",
      complete: false,
      isDragging: false,
    },
    {
        id:9,
      todo: "Making another New website!",
      complete: false,
      isDragging: false,
    },
    {
        id:10,
      todo: "Making another New website1!",
      complete: false,
      isDragging: false,
    },
  ]);

  const handleAddTodo = () => {
    if (todoInputText.length > 0) {
      setTodos([
        ...todos,
        { todo: todoInputText, complete: false, isDragging: false },
      ]);
    }
  };

  const handleTodoClicks = (e, index) => {
    setactiveObject(index)
    switch (e.detail) {
      case 1:
        // complete - > true
        const newArr = [];
        todos.forEach((item, i) => {
          if (i === index) {
            newArr.push({
              todo: item.todo,
              complete: !item.complete,
            });
          } else {
            newArr.push(item);
          }
        });

        setTodos(newArr);
        break;
      case 2:
        setTodos(todos.filter((item, iy) => iy !== index));
        break;

      default:
        break;
    }
  };

  let todoItemDrag = useRef();
  let todoItemDragOver = useRef();

  const Drag_Start = (e, index) => {
    todoItemDrag.current = index;
  };
  const Drag_Enter = (e, index) => {
    todoItemDragOver.current = index;

    const cpArr = [...todos];

    let finalArr = [];

    cpArr.forEach((item) => {
      finalArr.push({
        todo: item.todo,
        complete: item.complete,
        isDragging: false,
      });
    });

    finalArr[index].isDragging = true;

    setTodos(finalArr);
  };
  const Drag_End = (e, index) => {
    const arr1 = [...todos];

    const todo_item_main = arr1[todoItemDrag.current];
    arr1.splice(todoItemDrag.current, 1);
    arr1.splice(todoItemDragOver.current, 0, todo_item_main);

    todoItemDrag.current = null;
    todoItemDragOver.current = null;

    let final_arr = [];

    arr1.forEach((item) => {
      final_arr.push({
        todo: item.todo,
        complete: item.complete,
        isDragging: false,
      });
    });

    setTodos(final_arr);
  };

  // delete
  const handledelete = (index) => {
    console.log("hello");
    // let arr3 = [...todos]
    // arr3.splice(index,1)
    // setTodos(arr3)
  };

  const activeToggle = (index) => {
    if (index == activeObject) {
      return "todo-item-text active ";
    } else {
      return "todo-item-text inactive";
    }
  };

  return (
    <div className="todo-container">
      <input
        onChange={(e) => setTodoInputText(e.target.value)}
        className="input-todo-text"
        type="text"
        placeholder="Enter a Task.."
      />
      <button onClick={() => handleAddTodo()} className="add-todo-button">
        Add Task
      </button>
      <div className="display-todo-container">
        {todos.map((todo, index) => (
          <React.Fragment key={todo.id}>
            <div className="list-item" >
              <h3
                key={todos.index}
                draggable
                droppable
                onDragStart={(e) => Drag_Start(e, index)}
                onDragEnter={(e) => Drag_Enter(e, index)}
                onDragEnd={(e) => Drag_End(e, index)}
                // style={{
                //   textDecoration: todo.complete,
                //   background: todo.complete ? "red" : null,
                // }}
                onClick={(e) => handleTodoClicks(e, index)}

                className={activeToggle(index)}
                // "todo-item-text activeToggle={}"
              >
                <div className="status-bar">
                  <AiOutlineMenu />
                </div>
                <h3 className="h3-tag" >
                  {" "}
                  {todo.todo}
                </h3>
                <div className="status-delete" onClick={handledelete}>
                  <AiOutlineDelete />
                </div>
              </h3>
            </div>
            {todo.isDragging ? <div className="drag-indicator"></div> : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
