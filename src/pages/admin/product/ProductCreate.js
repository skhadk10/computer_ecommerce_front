import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import AdminNav from "../../../component/nav/AdminNav";
import ProductCreateForm from "./ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "./FIleUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
  title: "Lenovo",
  description: "10 gen computer",
  price: "45",
  categories: [],
  category: "",
  subs: [],
  shipping: "Yes",
  quantity: "5",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "Apple",
  brand: "Mango",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOption, setSubOption] = useState(initialState);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, [loading]);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`${res.data.title} is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err, "error creating product");
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  // it grabs single category id ...
  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("clicked categroy", e.target.value);
    // empty subs make sub category empty when sub category is changed while selecting subs category in product
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB", res);
      setSubOption(res.data);
    });
    setShowSub(true);
  };



  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
        {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product create</h4>
          )}
          <hr />
          
          <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
          <ProductCreateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            subOption={subOption}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
