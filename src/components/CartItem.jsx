import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  deleteItem,
  incrementQuantity,
} from "../redux/bazarSlice";
import { MdOutlineClose } from "react-icons/md";
import { toast } from "react-toastify";

const CartItem = ({ image, price, quantity, title, _id }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex items-center gap-2">
        <MdOutlineClose
          onClick={() =>
            dispatch(deleteItem(_id)) & toast.error(`${title} is removed`)
          }
          className="text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-300"
        />
        <img className="w-32 h-32 object-cover" src={image} alt="productImg" />
      </div>
      <p className="w-52">{title}</p>
      <p>{`$${price}`}</p>
      <div className="flex items-center justify-center gap-4 p-3 border border-gray-200 text-gray-500">
        <p className="text-sm">Quantity</p>
        <div className="flex items-center gap-4">
          <button
            className="h-5 flex items-center font-normal text-lg border border-gray-200 px-2 outline-none hover:bg-gray-700 hover:text-white active:text-gray-900 duration-300"
            onClick={() => quantity > 1 && dispatch(decrementQuantity(_id))}
          >
            -
          </button>
          <p>{quantity}</p>
          <button
            className="h-5 flex items-center font-normal text-lg border border-gray-200 px-2 outline-none hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300"
            onClick={() => dispatch(incrementQuantity(_id))}
          >
            +
          </button>
        </div>
      </div>
      <p>${quantity * price}</p>
    </div>
  );
};

export default CartItem;
