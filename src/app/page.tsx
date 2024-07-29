import AddTodo from "@/components/todos/AddTodo";
import Todo from "@/components/todos/Todo";

import { prisma } from "@/utils/prisma";

async function getData() {
  const data = await prisma.todo.findMany({
    select: {
      title: true,
      id: true,
      isComplateed: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc"
    },
  });
  return data;
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
      <span className="text-4xl font-extrabold uppercase mb-10">TO-DO-LIST-APP</span>
      <div className="flex justify-center felx-col items-center flex-wrap">
        {/* add todo items */}
        <AddTodo />
        {/* map todos */}
        <div className="flex flex-col gap-5 items-center justify-center mt-10 w-screen">
          {
            data.map((todo, id) => (
              <div className="w-full" key={id}>
                <Todo todo={todo} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
