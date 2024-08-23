import { Delete, Edit, Done } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type PropsType = {
  todo: todoItemType;
  completeHandler: (id: todoItemType["id"]) => void;
  deleteHandler: (id: todoItemType["id"]) => void;
  editHandler: (
    id: todoItemType["id"],
    newTitle: todoItemType["title"]
  ) => void;
};

const TodoItem = ({
  todo,
  completeHandler,
  deleteHandler,
  editHandler,
}: PropsType) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [textVal, setTextVal] = useState<string>(todo.title);

  return (
    <Paper
      sx={{
        padding: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        {editActive ? (
          <TextField
            value={textVal}
            onChange={(e) => setTextVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && textVal.trim() !== "") {
                editHandler(todo.id, textVal);
                setEditActive(false);
              }
            }}
          />
        ) : (
          <Typography marginRight={"auto"}>{todo.title}</Typography>
        )}
        <Checkbox
          checked={todo.isCompleted}
          onClick={() => completeHandler(todo.id)}
        />
        <Button
          onClick={() => {
            setEditActive((prev) => !prev);
            if (!editActive) editHandler(todo.id, textVal);
          }}
        >
          {editActive ? <Done /> : <Edit />}
        </Button>
        <Button sx={{ opacity: 0.5 }} onClick={() => deleteHandler(todo.id)}>
          <Delete />
        </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItem;
