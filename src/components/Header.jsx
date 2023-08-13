import { avatarImg, basketIcon, logoDark } from "../assets";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDataLength, getUser, removeUser } from "../redux/bazarSlice";
import { useEffect, useRef, useState } from "react";
import { auth } from "../firebase.config";
import { ToastContainer, toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(getUser);
  const productDataLength = useSelector(getProductDataLength);
  const accountBarRef = useRef(null);
  const [showAccountBar, setShowAccountBar] = useState(false);

  const handleSignOut = () => {
    auth.signOut();
    dispatch(removeUser());
    toast.success("Signed out successfully");
  };

  useEffect(() => {
    const handleOutsideClick = event => {
      if (
        accountBarRef.current &&
        !accountBarRef.current.contains(event.target) &&
        !document.getElementById("profileImgContainer").contains(event.target)
      ) {
        // debugger
        console.log(showAccountBar + "c");
        if (showAccountBar) {
          setShowAccountBar(false);
          const element = accountBarRef.current;
          element.animate(
            [
              { opacity: 1, display: "block" },
              { opacity: 0, display: "none" },
            ],
            {
              duration: 100,
              easing: "ease",
            }
          );

          element.style.opacity = 0;
          element.style.display = "none";
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("scroll", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("scroll", handleOutsideClick);
    };
  }, [showAccountBar]);

  const handleAnimateBar = () => {
    setShowAccountBar(!showAccountBar);
    const element = accountBarRef.current;
    console.log(showAccountBar + "b");

    if (!showAccountBar) {
      element.animate(
        [
          { opacity: 0, display: "none" },
          { opacity: 1, display: "block" },
        ],
        {
          duration: 100,
          easing: "ease",
        }
      );

      element.style.opacity = 1;
      element.style.display = "block";
    } else {
      element.animate(
        [
          { opacity: 1, display: "block" },
          { opacity: 0, display: "none" },
        ],
        {
          duration: 100,
          easing: "ease",
        }
      );

      element.style.opacity = 0;
      element.style.display = "none";
    }
  };

  return (
    <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-800 font-tittleFont sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between">
        <Link className="outline-none" to="/">
          <div className="cursor-pointer">
            <img className="w-28" src={logoDark} alt="logo" />
          </div>
        </Link>
        <div className="flex items-center gap-8 relative">
          <ul className="flex items-center gap-8">
            <Link to="/">
              <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
                Home
              </li>
            </Link>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Pages
            </li>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Shop
            </li>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Element
            </li>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Blog
            </li>
          </ul>
          <Link to="cart">
            <div className="relative">
              <img className="w-6" src={basketIcon} alt="basket" />
              <span className="absolute top-2 left-0 w-6 text-sm flex items-center justify-center font-semibold font-tittleFont">
                {productDataLength}
              </span>
            </div>
          </Link>
          <Link
            onClick={handleAnimateBar}
            id="profileImgContainer"
            to={userInfo ? "/" : "/login"}
          >
            <img
              className="w-8 h-8 rounded-full"
              src={userInfo ? userInfo.image : avatarImg}
              alt=""
            />
          </Link>
          {userInfo && (
            <div
              ref={accountBarRef}
              style={{ display: "none" }}
              className="w-56 absolute right-[-6px] top-11 bg-white rounded-md p-4 border-[1px] border-gray-200 shadow-md shadow-[#31315d1a]"
            >
              <div className="absolute right-2 top-[-8px] z-40 w-6 h-6">
                <svg className="w-[21px] h-[21px]">
                  <g fill="none">
                    <path
                      fill="#E5E7EB"
                      fillOpacity="1"
                      d="M1 9.092h19l-6.402-6.74c-1.717-1.806-4.485-1.8-6.196 0L1 9.093zM20.342 8l-6.02-6.336c-2.108-2.22-5.538-2.218-7.645 0L.658 8h19.684z"
                    ></path>
                    <path
                      fill="#ffffff"
                      d="M7.402 2.353c1.711-1.801 4.48-1.807 6.196 0L20 9.093H1l6.402-6.74z"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="pb-2">
                <p className="font-tittleFont font-semibold">
                  {userInfo?.name}
                </p>
                <p className="text-[13px] text-gray-600">Administrator</p>
              </div>
              <hr className="bg-gray-400" />
              <div className="flex flex-col gap-1 pt-2">
                <p className="font-tittleFont text-blue-600 text-[15px] font-semibold cursor-pointer hover:text-gray-800">
                  Profile
                </p>
                <p
                  onClick={handleSignOut}
                  className="font-tittleFont text-blue-600 text-[15px] font-semibold cursor-pointer hover:text-gray-800"
                >
                  Sign out
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Header;
