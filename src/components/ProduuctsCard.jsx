import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { addToCart } from "../redux/bazarSlice";
import { ToastContainer, toast } from "react-toastify";


const ProduuctsCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rootId = product.title.toLowerCase().toString().split(" ").join("");

  const handleDetails = () => {
    navigate(`product/${rootId}`, {
      state: {
        item: product,
      },
    });
  };
  return (
    <div className="group relative">
      <div
        onClick={handleDetails}
        className="w-full h-96 cursor-pointer overflow-hidden"
      >
        <img
          className="w-full h-full object-cover group-hover:scale-110 duration-500"
          src={product.image}
          alt="productImg"
        />
      </div>
      <div className="w-full px-2 py-4 flex justify-between products-center border-[1px]">
        <div>
          <h2 className="font-tittleFont text-base font-bold">
            {product.title.substring(0, 15)}
          </h2>
          <h2 className="font-tittleFont text-lg">{product.category}</h2>
        </div>
        <div className="flex justify-end gap-2 relative overflow-hidden w-28 text-sm">
          <div className="text-sm relative w-28 flex justify-end gap-2 transform group-hover:translate-x-24 transition-transform duration-500">
            <p className="line-through text-gray-500">${product.oldPrice}</p>
            <p className="font-semibold">${product.price}</p>
          </div>
          <p onClick={() => dispatch(addToCart({
            _id: product._id,
            title: product.title,
            image: product.image,
            price: product.price,
            quantity: 1,
            description: product.description
          })) & toast.success(`${product.title} is added`)} className="absolute z-20 w-[100px] text-gray-500 hover:text-gray-900 flex gap-1 top-0 transform -translate-x-32 group-hover:translate-x-0 transition-transform cursor-pointer duration-500">
            add to cart{" "}
            <span className="flex products-center">
              <BsArrowRight />
            </span>
          </p>
        </div>
        <div className="absolute top-4 right-0">
          {product.isNew && (
            <p className="text-white bg-black py-1 px-6 font-semibold font-tittleFont">
              Sale
            </p>
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

export default ProduuctsCard;
