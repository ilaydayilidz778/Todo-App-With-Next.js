import AddTodo from "@/components/todos/AddTodo";
import Todo from "@/components/todos/Todo";


const fetchTodos = async () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseURL}/api/getTodos`);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

export default async function Home() {
  const data = await fetchTodos();
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
      <span className="text-4xl font-extrabold uppercase mb-10">TO-DO-LIST-APP</span>
      <div className="flex justify-center felx-col items-center flex-wrap">
        {/* add todo items */}
        <AddTodo />
        {/* map todos */}
        <div className="flex flex-col gap-5 items-center justify-center mt-10 w-screen">
          {data.map((todo: any) => (
            <div className="w-full" key={todo.id}>
              <Todo todo={todo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
