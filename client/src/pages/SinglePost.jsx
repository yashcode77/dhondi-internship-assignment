import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import profile from "../assets/profile.png"

function SinglePost() {
    const [post, setPost] = useState(null);
    const { postId } = useParams();
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/post/getPosts");
                // const res = await fetch(`/api/post/getPosts/${postId}`);
                const data = await res.json();
                const post = data.posts.find(p => p._id === postId);
                // Find the post with the matching postId
                setPost(post);
                if (post) {
                    setFormData({
                        title: post.title || '',
                        content: post.content || '',
                    });
                } else {
                    // Reset form data if post is null
                    setFormData({ title: '', content: '' });
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();

    }, []); // Fetch post whenever postId changes
    return (
        <div>

            {post ? (
                <div className='flex flex-col mt-5 gap-3 mr-3'>
                    <div className='text-3xl font-bold'>{post?.title}</div>
                    <div className='flex gap-1 items-center'>
                        <img
                            src={profile}
                            width={25}
                            alt=""
                            className="bg-black rounded-full"
                        />
                        <div className='text-sm'>
                            James Anderson
                        </div>
                        <div></div>
                    </div>
                    <div>{post?.content}</div>

                </div>
            ) : (<p className="text-lg text-center flex justify-center items-center h-screen">
                <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#000000"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </p>)}
        </div>
    )
}

export default SinglePost