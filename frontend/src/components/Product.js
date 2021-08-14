/** @format */

import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <div className="card text-center d-block m-4 w-100">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/products/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
       <Rating rating={product.rating} numReviews={product.numReviews}/>
        <div className="price">${product.price}</div>
      </div>
    </div>
  );
}

export default Product;
