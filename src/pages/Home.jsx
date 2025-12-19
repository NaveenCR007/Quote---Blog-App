import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Container } from '../components'


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
                            <h1 className="text-2xl font-bold">
                                Welcome to Blogs
                            </h1>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full py-8 mt-4 text-center">
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


export default Home
