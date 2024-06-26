import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AllApps from "./pages/AllApps";
import YourFeeds from "./pages/YourFeeds";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditPostModal from "./components/EditPostModal";
import SinglePost from "./pages/SinglePost";

const App = () => {
  return (
    <RootLayout>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AllApps />} />
        <Route path="/your-feeds" element={<YourFeeds />} />
        <Route path="/update-post/:postId" element={<EditPostModal />} />
        <Route path="/single-post/:postId" element={<SinglePost />} />
      </Routes>
    </RootLayout>
  );
};

export default App;
