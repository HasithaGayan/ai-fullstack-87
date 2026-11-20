
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

function mergeDescriptions(
    description: string | undefined,
    id: string,
    error?: string
): string | undefined {

    const ids = [
        ...(description?.split(/\s+/).filter(Boolean) ?? []),
        ...(error ? [`${id}-error`] : []),
    ];

    const merged = [...new Set(ids)].join(" ");

    return merged || undefined;
}

function mergeClasses(
    base: string,
    extra?: string
) {
    return [base, extra]
        .filter(Boolean)
        .join(" ");
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
    className,
    "aria-describedby": description,
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
                className={mergeClasses(
                    styles.control,
                    className
                )}

                aria-invalid={
                    error
                        ? true
                        : props["aria-invalid"] ?? false
                }

                aria-describedby={
                    mergeDescriptions(
                        description,
                        id,
                        error
                    )
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
    className,
    "aria-describedby": description,
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
                className={mergeClasses(
                    styles.control,
                    className
                )}

                aria-invalid={
                    error
                        ? true
                        : props["aria-invalid"] ?? false
                }

                aria-describedby={
                    mergeDescriptions(
                        description,
                        id,
                        error
                    )
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
    className,
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

            className={mergeClasses(
                styles.button,
                className
            )}
        >
            {pending ? "Saving..." : children}
        </button>
    );
}
