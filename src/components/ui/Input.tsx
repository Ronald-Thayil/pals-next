import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export function Input({
    label,
    error,
    helperText,
    className = '',
    id,
    ...props
}: InputProps) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={`
          w-full px-3.5 py-2.5 border rounded-lg bg-white text-slate-900 text-sm 
          placeholder:text-slate-400 transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          disabled:bg-slate-100 disabled:cursor-not-allowed
          ${error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : 'border-slate-300'}
          ${className}
        `}
                {...props}
            />
            {error && (
                <p className="mt-1.5 text-xs text-error-600">{error}</p>
            )}
            {helperText && !error && (
                <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
            )}
        </div>
    );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export function Textarea({
    label,
    error,
    helperText,
    className = '',
    id,
    ...props
}: TextareaProps) {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={textareaId}
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                    {label}
                </label>
            )}
            <textarea
                id={textareaId}
                className={`
          w-full px-3.5 py-2.5 border rounded-lg bg-white text-slate-900 text-sm 
          placeholder:text-slate-400 transition-colors duration-150 resize-y min-h-[100px]
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          disabled:bg-slate-100 disabled:cursor-not-allowed
          ${error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : 'border-slate-300'}
          ${className}
        `}
                {...props}
            />
            {error && (
                <p className="mt-1.5 text-xs text-error-600">{error}</p>
            )}
            {helperText && !error && (
                <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
            )}
        </div>
    );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

export function Select({
    label,
    error,
    options,
    className = '',
    id,
    ...props
}: SelectProps) {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={selectId}
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                    {label}
                </label>
            )}
            <select
                id={selectId}
                className={`
          w-full px-3.5 py-2.5 border rounded-lg bg-white text-slate-900 text-sm 
          transition-colors duration-150 cursor-pointer appearance-none
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          disabled:bg-slate-100 disabled:cursor-not-allowed
          ${error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : 'border-slate-300'}
          ${className}
        `}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                }}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1.5 text-xs text-error-600">{error}</p>
            )}
        </div>
    );
}

export default Input;
