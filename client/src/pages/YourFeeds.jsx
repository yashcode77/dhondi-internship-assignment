import { Button } from "@material-tailwind/react";
import  nodata  from "../assets/no-data.png"
import { useState, useEffect } from "react";
import PostModal from "../components/PostModal";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";

function YourFeeds() {
    const [showModal, setShowModal] = useState(false);
    
    const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getPosts");
        const data = await res.json();
        // console.log(data.posts);
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);
    
  return (
    <div className="flex flex-col">
        <div className="flex justify-between items-center">
            <div>YOUR POSTS</div>
            <div>
                <Button 
                className="w-20 md:h-8 md:w-44 flex items-center justify-center rounded-md"
                onClick={() => setShowModal(true)}
                >
                    Write
                </Button>
            </div>
        </div>
        {/* <PostCard /> */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> */}
        <div className="flex flex-col gap-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="flex justify-center">
              <PostCard post={post} setPosts={setPosts}/>
            </div>
          ))
        ) : (
          <p className="text-lg text-center">No posts available</p>
        )}
      </div>
        <div className="h-screen flex justify-center items-center">
            {/* <div className="flex flex-col gap-2">
            <img src={nodata}
            className="bg-blend-lighten"
            alt="" />
            <div>
                <button 
                className="bg-blue-400 rounded-md text-white p-3 w-full hover:bg-blue-600"
                onClick={() => setShowModal(true)}
                >
                    START WRITING
                </button>
            </div>
            </div> */}
        </div>
        <PostModal onClose={() => setShowModal(false)} visible={showModal} setShowModal={setShowModal}/>
    </div>
  )
}

export default YourFeeds