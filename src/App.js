import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./component/nav/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { ToastContainer } from "react-toastify";
import ForgetPassword from "./pages/auth/ForgetPassword";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { createOrUpdateUser, currentUser } from "./functions/auth/auth";
import History from "./pages/user/History";
import UserRoutes from "./component/routes/UserRoutes";
import Wishlist from "./pages/user/Wishlist";
import Password from "./pages/user/Password";
import AdminRoutes from "./component/routes/AdminRoutes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/AllProducts/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        // it make the user data stay on redux store
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: user.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data.id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    return () => unsubcribe();
  }, []);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/register/complete"
            element={<RegisterComplete />}
          />
          <Route exact path="/forgot/password" element={<ForgetPassword />} />
          <Route
            exact
            path="/user/history"
            element={
              <UserRoutes>
                <History />
              </UserRoutes>
            }
          />
          <Route
            exact
            path="/user/password"
            element={
              <UserRoutes>
                <Password />
              </UserRoutes>
            }
          />
          <Route
            exact
            path="/user/wishlist"
            element={
              <UserRoutes>
                <Wishlist />
              </UserRoutes>
            }
          />
          <Route
            exact
            path="/admin/dashboard"
            element={
              <AdminRoutes>
                <AdminDashboard />
              </AdminRoutes>
            }
          />
          <Route
            exact
            path="/admin/category"
            element={
              <AdminRoutes>
                <CategoryCreate />
              </AdminRoutes>
            }
          />
          <Route
            exact
            path="/admin/category/:slug"
            element={
              <AdminRoutes>
                <CategoryUpdate />
              </AdminRoutes>
            }
          />
          <Route
            exact
            path="/admin/sub"
            element={
              <AdminRoutes>
                <SubCreate />
              </AdminRoutes>
            }
          />
          <Route
            exact
            path="/admin/sub/:slug"
            element={
              <AdminRoutes>
                <SubUpdate />
              </AdminRoutes>
            }
          />
          <Route
            exact
            path="/admin/product"
            element={
              <AdminRoutes>
                <ProductCreate />
              </AdminRoutes>
            }
          />

          <Route
            exact
            path="/admin/products"
            element={
              <AdminRoutes>
                <AllProducts />
              </AdminRoutes>
            }
          />
          <Route
            exact
            path="/admin/product/:slug"
            element={
              <AdminRoutes>
                <ProductUpdate />
              </AdminRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
