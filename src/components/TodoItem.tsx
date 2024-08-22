import { Delete, Edit } from "@mui/icons-material";
import { Button, Checkbox, Paper, Stack, Typography } from "@mui/material";

type PropsType = {
  todo: todoItemType;
  completeHandler: (id: todoItemType["id"]) => void;
  deleteHandler: (id: todoItemType["id"]) => void;
};

const TodoItem = ({ todo, completeHandler, deleteHandler }: PropsType) => {
  return (
    <Paper
      sx={{
        padding: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        <Typography marginRight={"auto"}>{todo.title}</Typography>
        <Checkbox
          checked={todo.isCompleted}
          onClick={() => completeHandler(todo.id)}
        />
        <Button>
          <Edit />
        </Button>
        <Button sx={{ opacity: 0.5 }} onClick={() => deleteHandler(todo.id)}>
          <Delete />
        </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItem;
