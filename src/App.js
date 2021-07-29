import React, { useState, useCallback,useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home";
import MyMessages from "./pages/myMessages";
import Search from "./pages/search";
import UserLanding from "./pages/userLanding";
import Profile from "./pages/profile";
import { AuthContext } from "./shared/context/auth-context";
import Nav from "./shared/components/nav";
import About from "./pages/aboutus";
import Sidebar from "./shared/components/sidebar";

const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
    // false || !!window.localStorage.getItem("token")
  // );
  const [userId, setUserId] = useState(window.localStorage.getItem("uid"));
  const [isOpen, setIsOpen] = useState();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  

  const logIn = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("uid", uid);
  }, []);

  const logOut = useCallback(() => {
    setToken(null);
    setUserId(null);
    window.localStorage.removeItem("token") 
    window.localStorage.removeItem("uid");
  }, []);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/search" exact>
          <Search />
        </Route>
        <Route path="/u/:name/:uid" exact>
          <UserLanding />
        </Route>
        <Route path="/myMessages" exact>
          <MyMessages />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Redirect to="/search" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/u/:name/:uid" exact>
          <UserLanding />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/search" exact>
          <Search />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        logIn: logIn,
        logOut: logOut,
        userId: userId,
      }}
    >
      <Router>
        <header>
          <Sidebar isOpen={isOpen} toggle={toggle} />
          <Nav isOpen={isOpen} toggle={toggle} />
        </header>
        <main>{routes}</main>
      </Router>
      <footer>
        <p>copyright &copy; 2020 by AZEM</p>
      </footer>
    </AuthContext.Provider>
  );
};

export default App;
