import React, { useId } from 'react'

// The 'ref' here is received from the parent component
function Select({ options, label, className = '', ...props }, ref) {
    const id = useId();

    return (
        <div className='w-full'>
            {label &&
                <label htmlFor={id}>
                    {label}
                </label>
            }

            <select {...props} id={id} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} ref={ref}>

                {/* only loop, if 'options' is not empty */}
                {options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

// This is another way of exporting 'forwardRef' componenets
export default React.forwardRef(Select)
