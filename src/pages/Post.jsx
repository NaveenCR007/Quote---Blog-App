import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import storageService from '../appwrite/config'
import { Container, Button } from '../components'
import parse from 'html-react-parser'

function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    const userData = useSelector(state => state.auth.userData)

    useEffect(() => {
        if (slug) { // slug -> post id
            storageService.getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post)
                    } else {
                        navigate('/')
                    }
                })
        }
    }, [slug, navigate])


    // If both post and userData id are same, then he is an author of the post
    const isAuthor = post && userData ? post.userId === userData.$id : false

    // Delete funtion
    const deletePost = () => {
        storageService.deletePost(slug)
            .then((status) => { // status = true/false

                if (status) {
                    // if post is deleted, then delete the image(file in DB)
                    storageService.deleteFile(post.featuredImage)
                    navigate('/all-posts')
                }
            })
    }

    return post ? (
        <div className='py-8'>
            <Container>
                {/* Get image preview of this post */}
                <div className="w-full mb-6">
                    {post.featuredImage && (
                        <img
                            src={storageService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            loading="lazy"
                            className="w-full max-h-[400px] object-cover rounded-lg"
                        />
                    )}
                </div>

                {/* If he is author, then he can delete and edit */}
                {isAuthor && (
                    <div className="flex gap-3 mb-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500">Edit</Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}

                {/* If he is not an author, then just show this post(read only) */}
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>

                <div className="browser-css">
                    {/* It converts the HTML string into real React elements */}
                    {/* parse() is an html-react-parse that we installed at start */}
                    {/* When we type our content, it will be in HTML, so we need this to convert it into React elements */}
                    {typeof post.content === 'string' ? parse(post.content) : "Invalid Post"}
                </div>
            </Container>
        </div>
    ) : null
}

export default Post
