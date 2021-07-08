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

const Sidebar = ({ toggle, isOpen }) => {
  const auth = useContext(AuthContext);

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
              <SidebarLink to="places/new" onClick={toggle}>
                حسابي
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
          <SidebarRoute to="/" onClick={toggle}>
            {auth.isLoggedIn ? "بحث" : "دخول"}
          </SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SideBarContainer>
  );
};

export default Sidebar;
