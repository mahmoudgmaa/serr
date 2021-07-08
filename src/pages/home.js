import React, { useState, useContext, useEffect } from "react";
import img from "../assets/homeimg.jpg";
import "./home.css";
import styled from "styled-components";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../utils/validators";
import Input from "../shared/components/input";
import { AuthContext } from "../shared/context/auth-context";
import serrIcon from "../assets/serr.png";
import googleIcon from "../assets/google.png";
import facebokIcon from "../assets/facebook.png";
import { useForm } from "../shared/components/form-hook";
import firebase from "firebase/app";
import "firebase/auth";

export const Button = styled.button`
  background: ${({ disabled }) => (disabled ? "#d3d3d3" : "#e65252")};
  color: #fff;
  font-weight: 50;
  font-size: 2rem;
  border-radius: 1rem;
  border: 1px solid ${({ disabled }) => (disabled ? "#d3d3d3" : "#e65252")};
  transition: 0.2s ease-in-out;
  /* margin-left: 5px; */
  margin: 2rem;
  padding: 6px 16px;
  &:hover {
    color: black;
    background: ${({ disabled }) => (disabled ? "#d3d3d3" : "#fff")};
    transition: 0.2s ease-in-out;
  }
`;

const Home = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const auth = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prev) => !prev);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCredintials) => {
      console.log(userCredintials);
    });
  }, []);
  const googleIconClickHandler = (e) => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCredintials) => {
        console.log(userCredintials);
        auth.logIn(userCredintials.user.uid);
      });
  };
  const facebookIconClickHandler = (e) => {
    e.preventDefault();
  };

  console.log(formState.isValid);
  return (
    <>
      <section className="homeSection" id="home">
        <div className="image">
          <img src={img} alt="home_image" />
        </div>
        <div className="form-wrapper">
          <form className="log-form">
            <img src={serrIcon} className="forrm-icon" />
            {!isLoginMode ? (
              <Input
                element="input"
                id="name"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="please enter a valid name"
                onInput={inputHandler}
                placeholder="اسم المستخدم"
                errorText="اسم المستخدم لا يجب ان يكون فارغا"
              />
            ) : null}
            <Input
              element="input"
              id="email"
              type="email"
              placeholder="البريد الالكتروني"
              validators={[VALIDATOR_EMAIL()]}
              errorText="قم بادخال بريداليكتروني صحيح"
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="password"
              type="password"
              placeholder="كلمة المرور"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="كلمة المرور يجب ان تحتوي علي الاقل علي 6 احرف"
              onInput={inputHandler}
            />
            {/* {isLoading && <reactBootstrap.Spinner animation="grow" />} */}
            <Button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? "دخول" : "انشاء حساب"}
            </Button>
            {isLoginMode ? (
              <p className="switch">
                اذا كنت لا تمتلك حساب، قم{" "}
                <span onClick={switchModeHandler}>بأنشاء حساب الان</span>
              </p>
            ) : (
              <p className="switch">
                اذا كنت تمتلك حساب، قم{" "}
                <span onClick={switchModeHandler}>بتسجيل الدخول الان</span>
              </p>
            )}
            <hr style={{ width: "100%" }} />
            <p className="orWith">
              {isLoginMode
                ? "او قم بالدخول باستخدام"
                : "او قم بانشاء حساب باستخدام"}
            </p>
            <br />
            <br />
            <div>
              <img
                src={facebokIcon}
                className="loginIcon"
                onClick={facebookIconClickHandler}
              />
              <img
                src={googleIcon}
                className="loginIcon"
                onClick={googleIconClickHandler}
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;
