"use client"
import * as actions from '@/actions';
import { useState } from "react";
import Button from "../button/Button";
import { MdEdit } from "react-icons/md";
import Form from "../form/Form";
import Input from "../input/Input";
import { todoProps } from "@/types";

const EditTodo = ({ todo }: { todo: todoProps }) => {
    const [editTodoState, setEditTodoState] = useState(false);
    const handleEdit = () => {
        if (todo.isComplateed) {
            return;
        }
        setEditTodoState(!editTodoState);
    };

    const handleSubmit = () => {
        setEditTodoState(false);
    }
    return (
        <div className="flex gap-5 items-center">
            <Button
                onClick={handleEdit}
                text={<MdEdit size="20" />}
                actionButton></Button>
            {editTodoState ? (
                <Form
                    action={actions.editTodo}
                    onSubmit={handleSubmit}>
                    <Input name="inputId" value={todo.id} type="hidden" />
                    <div className='flex justify-center gap-5'>
                        <Input
                            name='newTitle'
                            type='text'
                            placeholder='Edit Todo...' />
                        <Button
                            type="submit"
                            text="Save"
                            bgColor='bg-green-400'></Button>
                    </div>
                </Form>) : null}
        </div>
    );
};

export default EditTodo;