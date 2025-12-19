import { useEffect, useState } from "react"
import storageService from "../appwrite/config"
import { Container, PostForm } from "../components/index"
import { useNavigate, useParams } from "react-router-dom"


function EditPost() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            storageService.getPost(slug)
                .then((post) => setPost(post))
        } else {
            navigate('/')
        }
    }, [])

    console.log(post);
    

    // call the PostForm if we find the post the needs to be edited
    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost
