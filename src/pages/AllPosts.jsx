import React, { useEffect, useState } from 'react'
import storageService from '../appwrite/config'
import { PostCard, Container } from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([])

    // add the documents(obj)
    useEffect(() => {
        storageService.getAllPost()
            .then(posts => {
                if (posts) {
                    console.log("Found posts");
                    setPosts(posts.documents)
                }
            })
    }, [])


    return <>
        {posts.length !== 0 ?
            (
                <div className='w-full'>
                    <Container>
                        <div className='flex flex-wrap'>
                            {posts.map((post) => (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard
                                        $id={post.$id}
                                        title={post.title}
                                        featuredImage={post.featuredImage}
                                    />
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            ) :

            (
                <div className='w-full'>
                    <Container>
                        <div className='flex flex-wrap'>
                            {posts ? <h1>Loading posts...</h1> : <h1>No posts!</h1>}
                        </div>
                    </Container>
                </div>
            )}
    </>
}

export default AllPosts
