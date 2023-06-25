import { useSelector } from "react-redux";
import { Route, Outlet, Navigate, Routes } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirecr";
const UserRoutes = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  return user ? children : <LoadingToRedirect />;
};

export default UserRoutes;
