/** @format */

import React, { useEffect } from "react";
import Product from "../components/Product";

import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

function Home() {

  const dispatch = useDispatch()
  const {
    products,
    loading,
    error
  } = useSelector(state => state.productList)
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox />
      ) : (
        <div className="container">
          <div className="products-content">
            {products && products.map((product) => {
              return <Product key={product._id} product={product} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
