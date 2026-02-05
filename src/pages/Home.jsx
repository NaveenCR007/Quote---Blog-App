import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { Button } from '../components';


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
                <div className="w-full py-4 text-center">
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full bg-[#f6db9b]">
                            <h1 className="text-3xl font-bold mb-2 tracking-tight">
                                Expert Insights That Derives Innovation And Progress
                            </h1>
                            <h3 className='text-xl text-neutral-500 font-bold tracking-tight'>Discover expert perspective to spark ideas and strengthen your expertise.</h3>
                        </div>

                        <div className="cards flex flex-wrap justify-center gap-4 mt-4">
                            <Card src="./shop1.webp"
                                title={"App Development"}
                                Desc={"EdTech: A Comprehensive App Development Course"}
                            />

                            <Card src="./shop2.webp"
                                title={"App Development"}
                                Desc={"HIPPA Complaint App Development: Features, Cost"}
                            />

                            <Card src="./shop3.webp"
                                title={"App Development"}
                                Desc={"How to Build a Custom App: Crash Course"}
                            />

                            <Card src="./shop4.webp"
                                title={"Software Development"}
                                Desc={"How to Start Planning a Project"}
                            />

                            <Card src="./web1.webp"
                                title={"Web Development"}
                                Desc={"EdTech: A Comprehensive Web Development Course"}
                            />

                            <Card src="./web2.webp"
                                title={"Web Development"}
                                Desc={"HIPPA Complaint Web Application Development: Scaling, Cost"}
                            />

                            <Card src="./web3.webp"
                                title={"Software Development"}
                                Desc={"CRM Software Development: Features, Cost"}
                            />

                            <Card src="./web4.webp"
                                title={"Software Development"}
                                Desc={"Real Estate CRM Software Development"}
                            />
                        </div>

                        <div className='w-[95%] mx-auto h-72 border mt-4 rounded-xl bg-purple-100'>
                            <h2 className='text-center text-3xl font-bold pt-16 tracking-tight'>Read. Write. Share Ideas That Matter.</h2>
                            <p className='text-center text-lg tracking-tight pt-4 font-semibold text-neutral-600'>Discover insightful articles, practical guides, and stories written by people who love building, learning, and sharing knowledge. </p>

                            <Link to={'/login'}>
                                <Button className='py-3 mt-4 rounded-xl shadow-[0px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none' bgColor='bg-white' textColor='text-black' >
                                    Start Reading
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


export default Home
