import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
const { SubMenu, Item } = Menu;
const Header = () => {
  const [current, setCurrent] = useState("home");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { user } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      style={{ display: "block" }}
    >
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
        >
          {user && user.role==="subscriber" && (
            <Item> <Link to="/user/history">Dashboard</Link></Item>
          )}
          {user && user.role==="admin" && (
            <Item> <Link to="/admin/dashboard">Dashboard</Link></Item>
          )}
          <Item key="setting:3" onClick={logout} icon={<LogoutOutlined />}>
            logout
          </Item>
        </SubMenu>
      )}
      {!user && (
        <Menu.Item
          key="register"
          icon={<UserAddOutlined />}
          style={{
            float: "right",
          }}
        >
          <Link to="/register">Register</Link>
        </Menu.Item>
      )}
      {!user && (
        <Menu.Item
          key="login"
          icon={<UserOutlined />}
          style={{
            float: "right",
          }}
        >
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Header;
