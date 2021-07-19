import React, { useContext } from "react";
import {
  SideBarContainer,
  Icon,
  CloseIcon,
  SideBtnWrap,
  SidebarWrapper,
  SidebarRoute,
  SidebarLink,
  SidebarMenu,
} from "./SidebarElments";
import { AuthContext } from "../context/auth-context";
import { useHistory } from "react-router-dom";

const Sidebar = ({ toggle, isOpen }) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const onButtonClickHandler = (e) => {
    e.preventDefault();
    toggle();
    if (auth.isLoggedIn) {
      auth.logOut();
      history.push("/");
    } else {
      history.push("/");
    }
  };

  return (
    <SideBarContainer isOpen={isOpen} onClick={toggle}>
      <Icon>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          {auth.isLoggedIn ? (
            <>
              <SidebarLink to="/" onClick={toggle}>
                بحث
              </SidebarLink>
              <SidebarLink to="/myMessages" onClick={toggle}>
                رسائلي
              </SidebarLink>
              <SidebarLink to="/profile" onClick={toggle}>
                حسابي
              </SidebarLink>
              <SidebarLink to="/about" onClick={toggle}>
                تواصل معنا
              </SidebarLink>
            </>
          ) : (
            <>
              <SidebarLink to="/" onClick={toggle}>
                انشاء حساب{" "}
              </SidebarLink>
              <SidebarLink to="/search" onClick={toggle}>
                بحث
              </SidebarLink>
              <SidebarLink to="/about" onClick={toggle}>
                تواصل معنا
              </SidebarLink>
            </>
          )}
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to="/" onClick={onButtonClickHandler}>
            {auth.isLoggedIn ? "تسجيل الخروج" : "دخول"}
          </SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SideBarContainer>
  );
};

export default Sidebar;
