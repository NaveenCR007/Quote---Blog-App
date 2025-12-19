import storageService from '../appwrite/config'
import { Link } from 'react-router-dom'

// '$id' is the id of a post, this is 'appwrite' syntax, so we have to use '$' on id
// It will receive the post obj, then destructures these values
function PostCard({ $id, title, featuredImage }) {
    
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-200 rounded-2xl p-2'>
                <div className='w-full flex justify-center mb-4'>
                    {featuredImage ? (
                        <img
                            src={storageService.getFilePreview(featuredImage)}
                            alt={title}
                            className='rounded-xl'
                        />
                    ) : (
                        <div className='w-full h-40 bg-gray-400 rounded-xl flex items-center justify-center'>
                            No Image
                        </div>
                    )}
                </div>
                <h2 className='text-xl font-semibold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
