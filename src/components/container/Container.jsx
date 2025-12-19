function Container({ children }) {
    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            {children}
        </div>
    )
}

export default Container

// Container.jsx is a reusable layout wrapper that centers content, limits page width, and applies consistent padding across the app.

// It is just for styling