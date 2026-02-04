import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


function Home() {
    const authStatus = useSelector(state => state.auth.status)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [authStatus])

    if (loading) return null;

    return (
        <>
            {authStatus ? (
                <div className='w-full py-8'>
                    <div className='flex flex-wrap'>
                        <div className="p-2 w-full">
                            <h1 className="text-3xl font-bold text-center">
                                Welcome to Blogs
                            </h1>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full py-8 mt-4 text-center">
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-3xl font-bold mb-2 tracking-tight">
                                Expert Insights That Derives Innovation And Progress
                            </h1>
                            <h3 className='text-xl text-neutral-500 font-bold tracking-tight'>Discover expert perspective to spark ideas and strengthen your expertise.</h3>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


export default Home
