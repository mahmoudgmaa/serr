import React, { useContext } from "react";
import "./nav.css";
import { NavLink as Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import logo from "../../assets/serrlogo.png";
import { FaBars } from "react-icons/fa";

const Nav = ({ toggle }) => {
  const auth = useContext(AuthContext);
  return (
    <>
      <Link to="/" className="logo">
        <img src={logo} alt="logo" />
      </Link>

      <div id="menu-bar" className="fas fa-bars" onClick={toggle}>
        <FaBars />
      </div>
      {auth.isLoggedIn ? (
        <nav className="navbar">
          <Link className="link" to="/">
            بحث
          </Link>
          <Link className="link" to="/myMessages">
            رسائلي
          </Link>
          <Link className="link" to="/profile">
            حسابي
          </Link>
          <Link className="link" to="/about">
            تواصل معنا
          </Link>
          <button className="link" style={{ background: "transparent" }} onClick={auth.logOut}>
            تسجيل الخروج
          </button>
        </nav>
      ) : (
        <nav className="navbar">
          <Link className="link" to="/">
            انشاء حساب{" "}
          </Link>
          <Link className="link" to="/">
            دخول{" "}
          </Link>
          <Link className="link" to="/search">
            بحث
          </Link>
          <Link className="link" to="/about">
            {" "}
            تواصل معنا
          </Link>
        </nav>
      )}
    </>
  );
};

export default Nav;
