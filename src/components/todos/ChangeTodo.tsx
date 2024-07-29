import React from 'react';
import * as actions from '@/actions';
import Form from '../form/Form';
import Input from '../input/Input';
import Button from '../button/Button';
import { todoProps } from '@/types';
import { FaCheck } from 'react-icons/fa';

const ChangeTodo = ({ todo }: { todo: todoProps }) => {
    return (
        <Form action={actions.changeStatus}>
            <Input name="inputId" value={todo.id} type="hidden" />
            <Button
                type="submit"
                text={<FaCheck />}
                actionButton
                bgColor={todo.isComplateed ? "bg-green-400" : "bg-blue-500"}></Button>
        </Form>
    );
};

export default ChangeTodo;