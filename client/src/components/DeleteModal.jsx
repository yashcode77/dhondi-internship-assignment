/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteModal = ({ visible, onClose, postIdToDelete, setPosts, setShowDeleteModal }) => {
    const [, setPublishError] = useState(null);
    const navigate = useNavigate();

    const ToastContent = () => (
        <div>
            <h2>Post Deleted</h2>
        </div>
    );

    if (!visible) return null;

    const handleOnClose = (e) => {
        if (e.target.id === 'container' || e.target.id === 'cancel') onClose();
    };

    const handleDeletePost = async () => {
        try {
            const res = await fetch(`/api/post/deletepost/${postIdToDelete}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                const data = await res.json();
                console.log(data.message);
            } else {
                setPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
                toast.success(<ToastContent />, {
                    position: 'top-center',
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    height: 55,
                    width: 300,
                });
                setTimeout(() => {
                    setShowDeleteModal(false); // Close the modal after successful deletion
                }, 5000); // Delay closing the modal
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div
            id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center h-full"
        >
            <div className="bg-white p-8 rounded w-full max-w-md overflow-y-auto">
                <div className="flex justify-center font-bold mb-5">Are You sure you want to delete this?</div>
                <div className="flex justify-center gap-2">
                    <div className="text-center">
                        <button
                            className="select-none rounded border border-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            id="cancel"
                        >
                            No, Cancel
                        </button>
                    </div>
                    <div className="text-center">
                        <button className="px-5 py-2 bg-black hover:bg-brown-600 text-white rounded" onClick={handleDeletePost}>
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default DeleteModal;

