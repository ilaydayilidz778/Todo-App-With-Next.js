import * as actions from '@/actions';
import React from 'react';
import Button from '../button/Button';
import { todoProps } from '@/types';
import Form from '../form/Form';
import Input from '../input/Input';
import { FaTrash } from 'react-icons/fa';

const DeleteTodo = ({ todo }: { todo: todoProps }) => {
    return (
        <div className="flex gap-5 items-center">
            <Form action={actions.deleteTodo}>
                <Input type='hidden' name='inputId' value={todo.id} />
                <Button
                    type='submit'
                    text={<FaTrash size="20" />}
                    actionButton
                    bgColor='bg-red-400'></Button>
            </Form>
        </div>
    );
};

export default DeleteTodo;