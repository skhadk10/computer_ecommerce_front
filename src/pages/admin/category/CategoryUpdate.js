import React, { useState, useEffect } from "react";
import AdminNav from "../../../component/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getCategories,
  getCategory,
  updateCategory,
} from "../../../functions/category";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryForm } from "./CategoryForm";

const CategoryUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  const  navigate  = useNavigate();
  
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategory(slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateCategory(slug, { name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        navigate("/admin/category");
        // its reload as soon as the categor is created as it is used in useffect
        // loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };



  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Update category</h4>
          )}
          <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
