
import type {
    ButtonHTMLAttributes,
    InputHTMLAttributes,
    SelectHTMLAttributes,
} from "react";

import styles from "./FormFields.module.css";

interface FieldProps {
    id: string;
    label: string;
    error?: string;
}

export function FieldError({
    id,
    message,
}: {
    id: string;
    message?: string;
}) {
    if (!message) {
        return null;
    }

    return (
        <p
            id={id}
            className={styles.error}
        >
            {message}
        </p>
    );
}

type TextFieldProps =
    FieldProps &
    InputHTMLAttributes<HTMLInputElement>;

export function TextField({
    id,
    label,
    error,
    ...props
}: TextFieldProps) {
    return (
        <div className={styles.field}>
            <label htmlFor={id}>
                {label}
            </label>

            <input
                {...props}
                id={id}
                className={styles.control}
                aria-invalid={Boolean(error)}
                aria-describedby={
                    error
                        ? `${id}-error`
                        : undefined
                }
            />

            <FieldError
                id={`${id}-error`}
                message={error}
            />
        </div>
    );
}

type SelectFieldProps =
    FieldProps &
    SelectHTMLAttributes<HTMLSelectElement> & {
        options: readonly string[];
    };

export function SelectField({
    id,
    label,
    error,
    options,
    ...props
}: SelectFieldProps) {
    return (
        <div className={styles.field}>
            <label htmlFor={id}>
                {label}
            </label>

            <select
                {...props}
                id={id}
                className={styles.control}
                aria-invalid={Boolean(error)}
                aria-describedby={
                    error
                        ? `${id}-error`
                        : undefined
                }
            >
                {options.map(option => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>

            <FieldError
                id={`${id}-error`}
                message={error}
            />
        </div>
    );
}

export function FormButton({
    pending = false,
    children,
    disabled,
    type = "button",
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
    pending?: boolean;
}) {
    return (
        <button
            {...props}
            type={type}
            disabled={disabled || pending}
            className={styles.button}
        >
            {pending ? "Saving..." : children}
        </button>
    );
}
