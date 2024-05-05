import { useState } from "react";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import DeleteModal from "../components/DeleteModal";
import PostModal from "./PostModal";
import EditPostModal from "./EditPostModal";
import { useNavigate } from 'react-router-dom';
import profile from "../assets/profile.png"

function PostCard({ post, setPosts }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');
    const navigate = useNavigate();

    const handleEditClick = () => {
        // Open the post modal for editing
        setShowPostModal(true);
    };

    const handleDeleteClick = () => {
        // Open the delete modal for confirmation
        setShowDeleteModal(true);
        setPostIdToDelete(post._id);
    };

    const truncatedContent = post.content.slice(0, 50);
    const isContentTruncated = post.content.length > 50;

    return (
        <div className="bg-white p-3 mt-5 w-full shadow-md">
            <div className="flex flex-col border-b-2">
                <div className="flex justify-between">
                    <div className="font-bold text-lg">{post.title}</div>
                    <div className="flex gap-2 items-center">
                        <Link
                            // className='text-teal-500'
                            to={`/update-post/${post._id}`}
                        >
                            <button onClick={handleEditClick}><RiEdit2Fill /></button>
                        </Link>
                        <Link>
                            <button onClick={handleDeleteClick}><MdDelete /></button>
                        </Link>
                    </div>
                </div>
                <div className="flex gap-8 text-sm items-center mb-2">
                    <div className="flex gap-1 items-center">
                        <img
                            src={profile}
                            width={25}
                            alt=""
                            className="bg-black rounded-full"
                        />
                        <div>James Anderson</div>
                    </div>
                    <div className="text-gray-500">{new Date(post.updatedAt).toLocaleDateString()}</div>
                </div>
            </div>
            <div className="mt-3">
                <div>{isContentTruncated ? truncatedContent : post.content}</div>
                {isContentTruncated && (
                    <button className="text-blue-500 hover:underline" onClick={() => navigate(`/single-post/${post._id}`)}>Read More</button>
                )}
            </div>
            <DeleteModal onClose={() => setShowDeleteModal(false)} visible={showDeleteModal} postIdToDelete={postIdToDelete} setPosts={setPosts} setShowDeleteModal={setShowDeleteModal} />
            {/* <EditPostModal onClose={() => setShowPostModal(false)} visible={showPostModal} setShowModal={setShowPostModal} post={post}/> */}
        </div>
    )
}

export default PostCard;
