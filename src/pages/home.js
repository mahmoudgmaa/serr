import React, { useState, useContext } from "react";
import img from "../assets/homeimg.jpg";
import "./home.css";
import {Button} from "../shared/components/Button"
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
import { useForm } from "../hooks/form-hook";
import { useHttpCleint } from "../hooks/http-hook";
import ErrorModal from "../shared/components/ErrorModal";
import gifLoader from "../assets/gifLoader.gif";


const Home = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isError, isLoading, error, errorHandler, sendRequset, setIsError } =
    useHttpCleint();
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

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((userCredintials) => {
  //     console.log(userCredintials);
  //   });
  // }, []);

  const googleIconClickHandler = (e) => {
    e.preventDefault();
  };

  const facebookIconClickHandler = (e) => {
    e.preventDefault();
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (isLoginMode) {
      try {
        const data = await sendRequset(
          "https://serr-secret.herokuapp.com/api/user/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        auth.logIn(data.userId, data.token);
      } catch (error) {}
    } else {
      try {
        const data = await sendRequset(
          "https://serr-secret.herokuapp.com/api/user/signup",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.logIn(data.userId, data.token);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      {isError && (
        <ErrorModal
          showModal={isError}
          setShowModal={setIsError}
          header={"something went wrong"}
          body={error}
          buttonText={"cancel"}
          oncancel={errorHandler}
        />
      )}
      <div className={`loader-container ${!isLoading && "fade-out"}`}>
        <img src={gifLoader} />
      </div>
      <section className="homeSection" id="home">
        <div className="image">
          <img src={img} alt="home_image" />
        </div>
        <div className="form-wrapper">
          <form className="log-form" onSubmit={onFormSubmit}>
            <img src={serrIcon} className="forrm-icon" />
            <h4>The website is under contruction</h4>
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
