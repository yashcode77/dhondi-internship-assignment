import { useState } from "react";
import { Link } from 'react-router-dom';    
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import DeleteModal from "../components/DeleteModal";
import PostModal from "./PostModal";
import EditPostModal from "./EditPostModal";

function PostCard({ post, setPosts }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

    const handleEditClick = () => {
        // Open the post modal for editing
        setShowPostModal(true);
    };

    const handleDeleteClick = () => {
        // Open the delete modal for confirmation
        setShowDeleteModal(true);
        setPostIdToDelete(post._id);
    };

    return (
        <div className="bg-white p-3 mt-5 w-full">
            <div className="flex flex-col border-b-2">
                <div className="flex justify-between">
                    <div className="font-bold text-lg">{post.title}</div>
                    <div className="flex gap-2 items-center">
                    <Link
                      className='text-teal-500 hover:underline'
                      to={`/update-post/${post._id}`}
                    >
                        <button onClick={handleEditClick}><RiEdit2Fill /></button>
                        </Link>
                        <button onClick={handleDeleteClick}><MdDelete /></button>
                    </div>
                </div>
                <div className="flex gap-8 text-sm">
                    <div>James Anderson</div>
                    <div className="text-gray-500">{new Date(post.updatedAt).toLocaleDateString()}</div>
                </div>
            </div>
            <div className="mt-3">
                <div>{post.content}</div>
            </div>
            <DeleteModal onClose={() => setShowDeleteModal(false)} visible={showDeleteModal} postIdToDelete={postIdToDelete} setPosts={setPosts}/>
            {/* <EditPostModal onClose={() => setShowPostModal(false)} visible={showPostModal} setShowModal={setShowPostModal} post={post}/> */}
        </div>
    )
}

export default PostCard;
