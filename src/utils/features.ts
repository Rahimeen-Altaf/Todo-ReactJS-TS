export const saveTodos = (todos: todoItemType[]): void => {
  localStorage.setItem("myTodos", JSON.stringify(todos));
};

export const getTodos = (): todoItemType[] => {
  const todos: todoItemType[] = JSON.parse(
    localStorage.getItem("myTodos") || "[]"
  );
  return todos;
};
