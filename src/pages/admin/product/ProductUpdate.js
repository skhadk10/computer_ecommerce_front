import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct, getProduct } from "../../../functions/product";
import AdminNav from "../../../component/nav/AdminNav";
import ProductCreateForm from "./ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "./FIleUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import ProductUpdateForm from "./ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "Apple",
  brand: "Mango",
};

const ProductUpdate = () => {
  const [values, setValues] = useState(initialState);
  const [subOption, setSubOption] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSub, setArrayOfSub] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = useParams();

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () =>
    getProduct(slug).then((p) => {
      // 1 load single porduct
      setValues({ ...values, ...p.data });
      // 2 load single product category subs
      getCategorySubs(p.data.category._id).then((res) => {
        console.log("SUBs", res);
        setSubOption(res.data);
      });

      //   3 prepare array of sub ids to show as defaulr sub value
      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      });
      setArrayOfSub((prev) => arr); // required for antd design select tos work
    });

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // it grabs single category id ...
  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("clicked categroy", e.target.value);
    // empty subs make sub category empty when sub category is changed while selecting subs category in product
    setValues({ ...values, subs: [] });
    setSelectedCategory(e.target.value);
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB", res);
      setSubOption(res.data);
    });
    // if user click back to the original category show its sub category in default
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    setArrayOfSub([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Product Update</h4>
          <FileUpload
            values={values}
            setValues={setValues}
            setLoading={setLoading}
          />
          <ProductUpdateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            subOption={subOption}
            categories={categories}
            arrayOfSub={arrayOfSub}
            setArrayOfSub={setArrayOfSub}
            selectedCategory={selectedCategory}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
