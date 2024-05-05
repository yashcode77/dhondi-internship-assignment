import { Button } from "@material-tailwind/react";
import nodata from "../assets/no-data.png";
import { useState, useEffect } from "react";
import PostModal from "../components/PostModal";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ThreeDots } from 'react-loader-spinner';

function YourFeeds() {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); // Change this to adjust the number of posts per page

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getPosts");
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [posts]);

  // Get total number of pages

  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col mr-6">
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
      <div className="flex flex-col gap-3">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <div key={post._id} className="flex justify-center">
              <PostCard post={post} setPosts={setPosts} />
            </div>
          ))
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

      <ReactPaginate
        previousLabel={<ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />}
        nextLabel={<ArrowRightIcon strokeWidth={2} className="h-4 w-4" />}
        pageCount={totalPages}
        onPageChange={(selected) => paginate(selected.selected + 1)}
        containerClassName={"pagination flex items-center justify-center mt-6"}
        previousLinkClassName={"pagination__link bg-gray-200 px-3 py-1 rounded-md mr-2"}
        nextLinkClassName={"pagination__link bg-gray-200 px-3 py-1 rounded-md ml-2"}
        pageClassName={"pagination__item w-4 m-1 text-center"}
        pageLinkClassName={"pagination__link"}
        activeClassName={"pagination__link--active bg-black text-white"}
      />



      <PostModal onClose={() => setShowModal(false)} visible={showModal} setShowModal={setShowModal} />
    </div>
  );
}

export default YourFeeds;
