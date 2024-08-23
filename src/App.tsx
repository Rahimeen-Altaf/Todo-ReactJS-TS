import {
  AppBar,
  Button,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem.tsx";
import { getTodos, saveTodos } from "./utils/features.ts";

const App = () => {
  const [todos, setTodos] = useState<todoItemType[]>(getTodos());

  const [title, setTitle] = useState<todoItemType["title"]>("");

  const completeHandler = (id: todoItemType["id"]): void => {
    const newTodos: todoItemType[] = todos.map((todo) => {
      if (todo.id === id) todo.isCompleted = !todo.isCompleted;
      return todo;
    });
    setTodos(newTodos);
  };

  const deleteHandler = (id: todoItemType["id"]): void => {
    const newTodos: todoItemType[] = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const editHandler = (
    id: todoItemType["id"],
    newTitle: todoItemType["title"]
  ): void => {
    const newTodos: todoItemType[] = todos.map((todo) => {
      if (todo.id === id) todo.title = newTitle;
      return todo;
    });
    setTodos(newTodos);
  };

  const submitHandler = (): void => {
    const newTodo: todoItemType = {
      id: String(Math.random() * 1000),
      title: title,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setTitle("");
  };

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <Container
      maxWidth="sm"
      sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Todo App</Typography>
        </Toolbar>
      </AppBar>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: 2,
          marginTop: 2,
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        {todos.map((i) => (
          <TodoItem
            deleteHandler={deleteHandler}
            completeHandler={completeHandler}
            key={i.id}
            todo={i}
            editHandler={editHandler}
          />
        ))}
      </Stack>

      <Stack direction="row" spacing={2} mt={2}>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          label="Add Todo"
          onKeyDown={(e) => {
            if (e.key === "Enter" && title) {
              submitHandler();
            }
          }}
        />
        <Button variant="contained" onClick={submitHandler} disabled={!title}>
          Add
        </Button>
      </Stack>
    </Container>
  );
};

export default App;
