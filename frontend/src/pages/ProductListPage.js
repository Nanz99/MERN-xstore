import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstant";

function ProductListPage(props) {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );
  const {
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
    success: successCreate,
  } = useSelector((state) => state.productCreate);

  const { success: successDelete } = useSelector(
    (state) => state.productDelete
  );

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct.product._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts());
  }, [dispatch, createdProduct, successCreate, successDelete, props.history]);

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };
  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div className="container">
      <h1>Product List: {products && products.length}</h1>
      <button type="button" className="btn btn-success " onClick={createHandler}>
        Create Product
      </button>
      <div className="mt-5 mb-4">

      {loadingCreate && <LoadingBox />}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <td>Id</td>
                <td>Name</td>
                <td>Image</td>
                <td>Catagory</td>
                <td>Brand</td>
                <td>Price</td>
                <td>Stock</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                return (
                  <tr key={p._id}>
                    <td>{p._id}</td>
                    <td>{p.name}</td>
                    <td>
                      <img
                        src={p.image}
                        alt={p.name}
                        className="img-list-product"
                      />
                    </td>
                    <td>{p.category}</td>
                    <td>{p.brand}</td>
                    <td>{p.price}</td>
                    <td>{p.countInStock}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() =>
                          props.history.push(`/product/${p._id}/edit`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteHandler(p)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  );
}

export default ProductListPage;
