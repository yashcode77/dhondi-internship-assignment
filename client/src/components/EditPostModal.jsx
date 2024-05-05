import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

function EditPostModal() {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/post/updatepost/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }

            if (res.ok) {
                setPublishError(null);
                navigate("/your-feeds");
            }
        } catch (error) {
            setPublishError('Something went wrong');
        }
    };

    return (
        <div className='h-screen flex justify-center items-center'>
            {post ? (
                <div className='w-1/2'>

                    {/* Render other post details here */}
                    <div className="bg-white p-4 rounded w-full max-w-md overflow-y-auto shadow-md">
                        <div className="flex flex-col">
                            <input
                                type="text"
                                className="border border-gray-700 p-2 rounded mb-5"
                                placeholder="Write Title"
                                value={formData.title}
                                onChange={(e) => {
                                    setFormData({ ...formData, title: e.target.value })
                                }}
                            />

                            <textarea
                                className="border border-gray-700 p-2 rounded mb-5 w-full h-64 resize-none"
                                placeholder="What's on your mind!!!!!"
                                style={{ resize: 'none' }}
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <div className="text-center">
                                <button
                                    className="px-5 py-2 bg-white text-black border-black rounded"
                                    id="cancel"
                                    onClick={() => onClose()}
                                >
                                    Cancel
                                </button>
                            </div>
                            <div className="text-center">
                                <button
                                    className="px-5 py-2 bg-black hover:bg-brown-600 text-white rounded"
                                    onClick={handleSubmit}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-lg text-center flex justify-center items-center h-screen">
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
                </p>
            )}
        </div>
    );
}

export default EditPostModal;
