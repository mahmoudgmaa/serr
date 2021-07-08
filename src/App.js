import React, { useState, useCallback, useEffect } from "react";
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
import firebase from "firebase/app";
import "firebase/auth";
import gifLoader from "./assets/gifLoader.gif";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userId, setUserId] = useState();
  const [isOpen, setIsOpen] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const logIn = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logOut = useCallback(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signed out successfully");
        setIsLoggedIn(false);
        setUserId(null);
      });
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCredintials) => {
      console.log(userCredintials);
      if (!userCredintials) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setInterval(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Search />
        </Route>
        <Route path="/:uid" exact>
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
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/:uid" exact>
          <UserLanding />
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
        isLoggedIn: isLoggedIn,
        logIn: logIn,
        logOut: logOut,
        userId: userId,
      }}
    >
      <div className={`loader-container ${!isLoading && "fade-out"}`}>
        <img src={gifLoader} />
      </div>
      <Router>
        <header>
          <Sidebar isOpen={isOpen} toggle={toggle} />
          <Nav isOpen={isOpen} toggle={toggle} />
        </header>
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
