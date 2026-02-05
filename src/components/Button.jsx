function Button({ children, bgColor = '', type = 'button', textColor = 'text-black', className = '', ...props }) {
    return (
        <button
            type={type}
            className={`className='bg-white border border-black text-sm sm:text-md px-2 py-1 sm:px-4 sm:py-1.5 mx-1 rounded-md hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] duration-200 transition-all' ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button