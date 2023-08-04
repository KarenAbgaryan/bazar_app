import React from "react";
import ProductsCard from "./ProduuctsCard";

const Products = ({ products }) => {
  return (
    <div className="py-10">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl text-white bg-black text-center py-2 w-80">
          Shopping Everyday
        </h1>
        <span className="w-20 bg-black h-[3px]"></span>
        <p className="text-gray-600 text-center max-w-[700px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          unde harum et recusandae odit, iusto ea tenetur architecto eligendi
          sit quasi totam minus, porro dolorum. Repellendus, fuga harum.
          Voluptatum veritatis mollitia, esse at nemo est.
        </p>
      </div>
      <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-4 gap-10">
        {products.map((product) => {
          return <ProductsCard key={product._id} product={product}/>;
        })}
      </div>
    </div>
  );
};

export default Products;
