import { createContext } from "react";
export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token:null,
  name:null,
  username:null,
  img:null,
  email:null,
  logIn: () => {},
  logOut: () => {},
});
