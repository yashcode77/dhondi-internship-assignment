import { useEffect, useState } from "react";
import { useRef } from "react";
// import SubMenu from "./SubMenu";
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { TiDocumentText } from "react-icons/ti";
import { FaRegSave } from "react-icons/fa";
import profile from "../../assets/profile.png"

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [isTabletMid, pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  

  return (
    <div className="h-screen sticky top-0">
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 flex ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        {open && <div className="flex flex-col gap-1 mt-5">
          <div className="flex justify-center">
            <img
            src={profile}
            width={65}
            alt=""
            className="bg-black rounded-full"
            />  
          </div>
          <div className="text-center font-bold text-xl">James Anderson</div>
          <div className="text-center text-gray-600 text-sm italic">@james_andy</div>
          <div className="flex justify-center gap-5">
            <div>
              <div className="font-bold">240</div>
              <div>Followers</div>
            </div>
            <div>
              <div className="font-bold">14</div>
              <div>Following</div>
            </div>
          </div>
        </div>}

        <div className="flex flex-col h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col justify-center gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            <li>
              <NavLink to={"/dashboard"} className="link">
                <AiOutlineAppstore size={23} className="min-w-max" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to={"/add-new-feed"} className="link">
                <CiSquarePlus size={23} className="min-w-max" />
                Add New Feed
              </NavLink>
            </li>
            <li>
              <NavLink to={"/your-feeds"} className="link">
                <TiDocumentText size={23} className="min-w-max" />
                Your Feeds
              </NavLink>
            </li>
            <li>
              <NavLink to={"/your-saved"} className="link">
                <FaRegSave size={23} className="min-w-max" />
                Your Saved
              </NavLink>
            </li>
            <li>
              <NavLink to={"/profile"} className="link">
                <BsPerson size={23} className="min-w-max" />
                Profile
              </NavLink>
            </li>

            {/* {(open || isTabletMid) && (
              <div className="border-y py-5 border-slate-300 ">
                <small className="pl-3 text-slate-500 inline-block mb-2">
                  Product categories
                </small>
                {subMenusList?.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1">
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
            )} */}
            <li>
              <NavLink to={"/settings"} className="link">
                <SlSettings size={22} className="min-w-max" />
                Settings
              </NavLink>
            </li>
          </ul>
          
          {/* <div className="">
            Login
          </div> */}
          
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
