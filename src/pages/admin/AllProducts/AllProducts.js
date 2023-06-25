import React, { useState, useEffect } from "react";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import AdminNav from "../../../component/nav/AdminNav";
import AdminProductCard from "./AdminProductCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllProducts = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const handleRemove = (slug) => {
    if (window.confirm("Are you sure you want to remove")) {
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts()
          toast.success(`${res.data.delete} is removed successfully`);
        })
        .catch((err) => {
          console.log(err);
          toast.error("error removing product", err);
        });
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? <h4> loading...</h4> : <h4>All Products</h4>}
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 pb-3">
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
