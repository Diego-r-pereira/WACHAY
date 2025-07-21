// frontend/src/components/ui/label.jsx
import React from "react";

export function Label({ htmlFor, className = "", children, ...props }) {
    return (
        <label
            htmlFor={htmlFor}
            className={
                "block text-sm font-medium text-gray-700 dark:text-gray-200 " +
                className
            }
            {...props}
        >
            {children}
        </label>
    );
}

export default Label;
