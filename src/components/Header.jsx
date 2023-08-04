import { avatarImg, basketIcon, logoDark } from "../assets";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductDataLength, getUser } from "../redux/bazarSlice";

const Header = () => {
  const userInfo = useSelector(getUser);
  const productDataLength = useSelector(getProductDataLength);

  return (
    <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-800 font-tittleFont sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between">
        <Link className="outline-none" to="/">
          <div className="cursor-pointer">
            <img className="w-28" src={logoDark} alt="logo" />
          </div>
        </Link>
        <div className="flex items-center gap-8">
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
          <Link to="/login">
            <img
              className="w-8 h-8 rounded-full"
              src={userInfo ? userInfo.image : avatarImg}
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
