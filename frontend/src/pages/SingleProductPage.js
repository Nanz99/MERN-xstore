/** @format */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";

function SingleProductPage(props) {
  const [qty, setQty] = useState(1);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const dispatch = useDispatch();
  const productId = props.match.params.id;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
 
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox />
      ) : (
        <div className="container">
          <Link to="/" className="btn btn-success">
            Back to Home
          </Link>
          <div className="row mt-5 mb-5">
            <div className="col-6">
              <img
                src={product.image}
                alt={product.name}
                className="img-product"
              />
            </div>
            <div className="col-3">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </li>
                <li>Price: ${product.price}</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-3 p-4">
              <div className="card-addtocart">
                <ul>
                  <li>
                    <div className="btn-add-container">
                      <div>Price : </div>
                      <span className="price">${product.price}</span>
                    </div>
                  </li>
                  <li>
                    <div className="btn-add-container">
                      <div>Status : </div>
                      <div className="status">
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="error">Unavaiable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product && product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="d-flex align-items-center">
                          <div>Qty: {"  "} </div>
                          <span>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(Number(product.countInStock)).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </span>
                        </div>
                      </li>

                      <li>
                        <button
                          className="btn btn-success"
                          onClick={addToCartHandler}
                        >
                          Add to cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleProductPage;
