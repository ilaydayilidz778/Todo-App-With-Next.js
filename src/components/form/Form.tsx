"use client"
import { formProps } from '@/types';
import React from 'react';
import { useRef } from "react";

const Form = ({ children, action, className, onSubmit }: formProps) => {
    const ref = useRef<HTMLFormElement>(null);
    return (
        <form
            action={async (formData) => {
                await action(formData);
                ref.current?.reset();
            }}
            className={className}
            onSubmit={onSubmit}
            ref={ref}>
            {children}
        </form>
    );
};

export default Form;