import React from "react";
import ProductDetails from "../features/product/components/ProductDetails";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";

const ProductDetailsPage = () => {
  return (
    <>
      <Navbar>
        <ProductDetails />
      </Navbar>
      <Footer></Footer>
    </>
  );
};

export default ProductDetailsPage;
