"use server";
import { prisma } from "@/utils/prisma"
import { revalidatePath } from "next/cache";

export async function createTodo(formData: FormData) {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

    const input = formData.get('input') as string;
    if (!input.trim()) {
        return;
    }

    const response = await fetch(`${baseURL}/api/createTodo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
    });

    if (!response.ok) {
        throw new Error('Failed to create todo');
    }

    revalidatePath("/");
}

export async function changeStatus(formData: FormData) {
    const inputId = formData.get('inputId') as string;
    const todo = await prisma.todo.findUnique({
        where: {
            id: inputId
        },
    });
    const updateStatus = !todo?.isComplateed;

    await prisma.todo.update({
        where: {
            id: inputId,
        },
        data: {
            isComplateed: updateStatus
        },
    });

    revalidatePath("/");
};

export async function editTodo(formData: FormData) {
    const newTitle = formData.get('newTitle') as string;
    const inputId = formData.get('inputId') as string;

    await prisma.todo.update({
        where: {
            id: inputId,
        },
        data: {
            title: newTitle
        },
    });

    revalidatePath("/");
};


export async function deleteTodo(formData: FormData) {
    const neTitle = formData.get('newTitle') as string;
    const inputId = formData.get('inputId') as string;

    await prisma.todo.delete({
        where: {
            id: inputId,
        }
    });

    revalidatePath("/");
};
