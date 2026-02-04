function Button({ children, bgColor = '', type = 'button', textColor = 'text-black', className = '', ...props }) {
    return (
        <button
            type={type}
            className={`className='bg-white border border-black px-4 py-2 mx-1 rounded-xl shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] duration-200 transition-all' ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button