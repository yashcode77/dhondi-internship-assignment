// /* eslint-disable react/prop-types */
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const PostModal = ({ visible, onClose, setShowModal, post }) => {
//     const [formData, setFormData] = useState({});
//     const [, setPublishError] = useState(null);
//     const navigate = useNavigate(); // Move useNavigate inside the component

//     if (!visible) return null;

//     const handleOnClose = (e) => {
//         if (e.target.id === "container" || e.target.id === "cancel") onClose();
//     };

//     const ToastContent = () => (
//       <div>
//           <h2>Post Added</h2>
//       </div>
//     )
//     const handleSubmit = async (e) => {
//         console.log("in handle submit");
//         e.preventDefault();
//         try {
//           const res = await fetch('/api/post/create', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//           });
//           const data = await res.json();
//           if (!res.ok) {
//             setPublishError(data.message);
//             return;
//           }
    
//           if (res.ok) {
//             setPublishError(null);
//             // navigate(`/post/${data.slug}`);
//             navigate("/your-feeds")
//             // visible = !visible
//             // window.location.reload();
//             toast.success(<ToastContent />, {
//               // icon: <FaTree size={60} color="green" />,

//               position: "top-center",
//               autoClose: 2000,
//               hideProgressBar: true,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               height: 55,
//               width: 300
//           });
//             setTimeout(()=>setShowModal(false),1000)
//           }
//         } catch (error) {
//           setPublishError('Something went wrong');
//         }
//       };

      

//     return (
//         <div
//             id="container"
//             onClick={handleOnClose}
//             className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center h-full"
//         >
//             <div className="bg-white p-4 rounded w-full max-w-md overflow-y-auto">
//                 <div className="flex flex-col">
//                     <input
//                         type="text"
//                         className="border border-gray-700 p-2 rounded mb-5"
//                         placeholder="Write Title"
//                         onChange={(e) => {
//                             setFormData({ ...formData, title: e.target.value });
//                             // console.log(formData)
//                         }}
//                         value = post && {post.title}
//                     />

//                     <textarea
//                         className="border border-gray-700 p-2 rounded mb-5 w-full h-64 resize-none"
//                         placeholder="What's on your mind!!!!!"
//                         style={{ resize: 'none' }}
//                         onChange={(e) => {
//                             setFormData({ ...formData, content: e.target.value });
//                             // console.log(formData)
//                           }}
//                           value = {post & post.content}
//                     />
//                 </div>
//                 <div className="flex justify-end gap-2">

//                 <div className="text-center">
//                     <button className="px-5 py-2 bg-white text-black border-black rounded"
//                     id="cancel"
//                     onClick={()=>console.log('clicked cancel')}
//                     >
//                         Cancel
//                     </button>
//                 </div>
//                 <div className="text-center">
//                     <button 
//                     className="px-5 py-2 bg-black hover:bg-brown-600 text-white rounded "
//                     onClick={handleSubmit} 
//                     >
//                         Publish
//                     </button>
//                 </div>
//                 </div>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default PostModal;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostModal = ({ visible, onClose, setShowModal, post }) => {
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [, setPublishError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Update form data with post content when post prop changes
        if (post) {
            setFormData({
                title: post.title || '',
                content: post.content || '',
            });
        } else {
            // Reset form data if post is null
            setFormData({ title: '', content: '' });
        }
    }, [post]);

    if (!visible) return null;

    const handleOnClose = (e) => {
        if (e.target.id === 'container' || e.target.id === 'cancel') onClose();
    };

    const ToastContent = () => (
        <div>
            <h2>Post Added</h2>
        </div>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
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
                // navigate('/your-feeds');
                toast.success(<ToastContent />, {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    height: 55,
                    width: 300,
                });
                setTimeout(() => {
                    setShowModal(false);
                    // window.location.reload();
                }, 1000);
            }
        } catch (error) {
            setPublishError('Something went wrong');
        }
    };

    return (
        <div
            id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center h-full"
        >
            <div className="bg-white p-4 rounded w-full max-w-md overflow-y-auto">
                <div className="flex flex-col">
                    <input
                        type="text"
                        className="border border-gray-700 p-2 rounded mb-5"
                        placeholder="Write Title"
                        // value={formData.title}
                        onChange={(e) => {setFormData({ ...formData, title: e.target.value })
                      console.log(e.target.value)}}
                    />

                    <textarea
                        className="border border-gray-700 p-2 rounded mb-5 w-full h-64 resize-none"
                        placeholder="What's on your mind!!!!!"
                        style={{ resize: 'none' }}
                        // value={formData.content}
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
                            Publish
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PostModal;
