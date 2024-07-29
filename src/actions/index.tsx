"use server";
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
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

    const inputId = formData.get('inputId') as string;

    const response = await fetch(`${baseURL}/api/changeStatus`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputId }),
    });

    if (!response.ok) {
        throw new Error('Failed to update todo status');
    }

    revalidatePath("/");
};


export async function editTodo(formData: FormData) {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

    const inputId = formData.get('inputId') as string;
    const newTitle = formData.get('newTitle') as string;

    const response = await fetch(`${baseURL}/api/editTodo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputId, newTitle }),
    });

    if (!response.ok) {
        throw new Error('Failed to update todo');
    }

    revalidatePath("/");
};


export async function deleteTodo(formData: FormData) {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

    const inputId = formData.get('inputId') as string;

    const response = await fetch(`${baseURL}/api/deleteTodo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputId }),
    });

    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }

    revalidatePath("/");
};
