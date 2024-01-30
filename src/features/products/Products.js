import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Products.css";
import { fetchAsync } from "./productsSlice";
import { addAsync } from "../cart/cartSlice";

export function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(fetchAsync());
  }, []);

  return (
    <div>
      <div className="row"></div>
      {products &&
        products.map((product) => (
          <div className="card" key={product.id}>
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "100%" }}
            />
            <h1>{product.title}</h1>
            <p className="price">${product.price}</p>
            <p>{product.description}</p>
            <p>
              <button onClick={() => dispatch(addAsync(product))}>
                Add to Cart
              </button>
            </p>
          </div>
        ))}
    </div>
  );
}
