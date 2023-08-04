import React, { useEffect, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addToCart } from "../redux/bazarSlice";
import { ToastContainer, toast } from 'react-toastify';

const Product = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const details = location.state.item;

  return (
    <div>
      <div className="max-w-screen-xl mx-auto my-10 flex gap-10">
        <div className="w-2/5 relative">
          <img
            className="w-full h-[550px] object-cover"
            src={details.image}
            alt="productImg"
          />
          {details.isNew && (
            <p className="absolute font-tittleFont py-1 px-8 top-4 right-0 font-semibold bg-black text-white">
              Sale
            </p>
          )}
        </div>
        <div className="w-3/5 flex flex-col gap-12 justify-center">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-4xl">{details.title}</h1>
            <div className="flex items-center gap-4 mt-3">
              <p className="line-through text-gray-500 font-normal">
                ${details.oldPrice}
              </p>
              <p className="text-2xl text-gray-900 font-medium">
                ${details.price}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-base">
            <div className="flex">
              {Array.from(Array(details.rating).keys()).map(id => {
                return <MdOutlineStar key={id} />;
              })}
            </div>
            <p className="text-xs text-gray-500">(1 Customer review)</p>
          </div>
          <p className="text-base text-gray-500 -mt-3">{details.description}</p>
          <div className="flex gap-4">
            <div className="flex items-center justify-center gap-4 p-3 border border-gray-200 text-gray-500">
              <p>Quantity</p>
              <div className="flex gap-4">
                <button
                  className="font-normal text-lg border border-gray-200 px-3 outline-none hover:bg-gray-700 hover:text-white active:text-gray-900 duration-300"
                  onClick={() => quantity > 1 && setQuantity(num => num - 1)}
                >
                  -
                </button>
                <p>{quantity}</p>
                <button
                  className="font-normal text-lg border border-gray-200 px-3 outline-none hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300"
                  onClick={() => setQuantity(num => num + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    _id: details._id,
                    title: details.title,
                    image: details.image,
                    price: details.price,
                    quantity: quantity,
                    description: details.description,
                  })
                ) & toast.success(`${details.title} is added`)
              }
              className="py-3 px-6 bg-black text-white"
            >
              add to cart
            </button>
          </div>
          <h2 className="flex gap-2 text-gray-500">
            Category:{" "}
            <span className="font-medium capitalize">{details.category}</span>
          </h2>
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

export default Product;
