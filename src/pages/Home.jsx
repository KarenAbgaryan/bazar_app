import React from "react";
import Banner from "../components/Banner";
import Products from "../components/Products";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const products = useLoaderData()
  console.log(products);
  return (
    <div>
      <Banner />
      <Products products={products}/>
    </div>
  );
};

export default Home;
