import {
  AppBar,
  Button,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import TodoItem from "./components/TodoItem.tsx";

const App = () => {
  const [todos, setTodos] = useState<todoItemType[]>([]);

  const [title, setTitle] = useState<todoItemType["title"]>("");

  const completeHandler = (id: todoItemType["id"]): void => {};
  const deleteHandler = (id: todoItemType["id"]): void => {};

  const submitHandler = (): void => {
    const newTodo: todoItemType = {
      id: String(Math.random() * 1000),
      title: title,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setTitle("");
  };

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography>Todo App</Typography>
        </Toolbar>
      </AppBar>

      <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {todos.map((i) => (
          <TodoItem
            deleteHandler={deleteHandler}
            completeHandler={completeHandler}
            key={i.id}
            todo={i}
          />
        ))}
      </Stack>
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
      <Button
        sx={{
          margin: "1rem 0",
        }}
        fullWidth
        variant="contained"
        onClick={submitHandler}
        disabled={!title}
      >
        Add
      </Button>
    </Container>
  );
};

export default App;
