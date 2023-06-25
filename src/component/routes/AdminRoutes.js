import { useSelector } from "react-redux";
import { Route, Outlet, Navigate, Routes } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirecr";
import { useEffect, useState } from "react";
import { currentAdmin } from "../../functions/auth/auth";
const AdminRoutes = ({ children }) => {
  const [ok, setOk] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));


  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token).then((res) => {
        console.log("CURRENT ADMIN RES", res);
        setOk(true);
      }).catch(err=>{
        console.log('ADMIN ROUTE ERROR', err);
        setOk(false)
      })
    }
  }, [user]);

  return ok ? children : <LoadingToRedirect />;
};

export default AdminRoutes;
