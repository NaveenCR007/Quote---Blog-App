import React, { useId } from 'react'

// 'react-hook-form' automatically passes 'ref' to this component, you don't have to create 'ref' manually!!

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) // This 'ref' is received by parent component
{
    const id = useId()

    return (
        <div className="w-full">
            {label &&
                <label htmlFor={id}>
                    {label}
                </label>
            }

            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                {...props}
                ref={ref}
                id={id}
            />
        </div>
    )
})

export default Input
