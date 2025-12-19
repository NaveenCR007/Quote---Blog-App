function Button({ children, bgColor = 'bg-blue-400', type = 'button', textColor = 'text-white', className = '', ...props }) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button