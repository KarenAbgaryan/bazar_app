import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductData, getUser, resetCart } from "../redux/bazarSlice";
import CartItem from "../components/CartItem";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userInfo = useSelector(getUser);
  const productData = useSelector(getProductData);
  const [payNow, setPayNow] = useState(false);
  // const totalFunction = () => {
  //   productData.map(({price, quantity}) => {
  //     return price * quantity
  //   })
  // }

  const payment = token => {
    fetch("/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: total * 100,
        token: token,
      }),
    }).then(isPaid => {
      if (isPaid) {
        navigate("/");
        setTimeout(() => {
          dispatch(resetCart());
        }, 1000);
      }
    });
  };

  const total =
    productData.reduce((aggr, { price, quantity }) => {
      aggr += price * quantity;
      return aggr;
    }, 0) || 0;

  const handleCheckout = () => {
    if (userInfo) {
      setPayNow(true);
    } else {
      toast.error("Please sign in to Checkout");
    }
  };

  return (
    <div>
      <img
        className="w-full h-60 object-cover"
        src="https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="cartImg"
      />
      <div className="py-10">
        {productData.length < 1 ? (
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <h2 className="text-xl text-orange-600 font-semibold font-tittleFont">
                Your Cart is Empty. Please go back to Shopping and add products
                to Cart.
              </h2>
              <Link to="/">
                <button className="flex items-center gap-1 text-gray-400 hover:text-gray-900 duration-300">
                  <span>
                    <BsArrowLeft />
                  </span>
                  go shopping
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex max-w-screen-xl py-10 mx-auto">
            <div className="w-2/3 flex flex-col gap-6 pr-10">
              <h2 className="font-tittleFont text-2xl">shopping cart</h2>
              {productData.map(({ image, price, quantity, title, _id }) => {
                return (
                  <CartItem
                    image={image}
                    price={price}
                    quantity={quantity}
                    title={title}
                    _id={_id}
                    key={_id}
                  />
                );
              })}
              <button
                onClick={() =>
                  dispatch(resetCart()) & toast.error("Your Cart is Empty")
                }
                className="w-32 bg-red-500 text-white py-1 ml-7 hover:bg-red-800 duration-300"
              >
                Reset Cart
              </button>
              <Link to="/">
                <button className="flex items-center gap-1 ml-7 text-gray-400 hover:text-gray-900 duration-300">
                  <span>
                    <BsArrowLeft />
                  </span>
                  go shopping
                </button>
              </Link>
            </div>
            <div className="w-1/3 bg-[#fafafa] px-4 py-6">
              <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-500 pb-4">
                <h2 className="font-medium text-2xl">cart totals</h2>
                <p className="flex items-center gap-6">
                  Subtotal{" "}
                  <span className="font-tittleFont font-bold text-lg">
                    ${total.toFixed(2)}
                  </span>
                </p>
                <p className="flex gap-4">
                  Subtotal{" "}
                  <span className="">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Doloribus, illo.
                  </span>
                </p>
              </div>
              <p className="flex justify-between font-tittleFont mt-6">
                Total{" "}
                <span className="font-bold text-xl">${total.toFixed(2)}</span>
              </p>
              <button
                onClick={handleCheckout}
                className="w-full text-base py-3 mt-6 bg-black text-white hover:bg-gray-600"
              >
                proceed to checkout
              </button>
              {payNow && (
                <div className="w-full mt-6 flex items-center justify-center">
                  <StripeCheckout
                    stripeKey="pk_test_51NaqE3Hcwjy7g1Wkjvd0pcTiOtSBOXcXcG60Bw0WOtJcRXgCgfnn6m3RjJ744dwMx8azj1JzYQYBLWJsMxtBGsHu00l54S05Ij"
                    name="Bazar Online Shopping"
                    amount={total * 100}
                    label="Pay to bazar"
                    description={`Your Paymant amount is $${total}`}
                    token={payment}
                    email={userInfo.email}
                  />
                </div>
              )}
            </div>
          </div>
        )}
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

export default Cart;
