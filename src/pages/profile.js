import React, { useState, useEffect, useContext, useRef } from "react";
import {
  ProfileSection,
  ProfileContent,
  Img,
  UploadImg,
  Input,
  ButtonsWrapper,
  UpdateButton,
  ForgetButton,
} from "./styles/profileElments";
import { AuthContext } from "../shared/context/auth-context";
import { useHistory } from "react-router-dom";
import ErrorModal from "../shared/components/ErrorModal";
import { useHttpCleint } from "../hooks/http-hook";
import gifLoader from "../assets/gifLoader.gif";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Profile = () => {
  const filePickRef = useRef();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [userData, setUserData] = useState({
    fbid: "",
    name: "",
    email: "",
    img: "",
  });
  const { isError, error, errorHandler, sendRequset, setIsError, isLoading } =
    useHttpCleint();
  const link =
    "https://serr.netlify.app/#/u/" + userData.name + "/" + auth.userId ||
    window.localStorage.getItem("userId");

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      setUserData({
        fbid: auth.userId || window.localStorage.getItem("userId"),
        name: auth.name || window.localStorage.getItem("name"),
        email: auth.email || window.localStorage.getItem("email"),
        img: auth.img || window.localStorage.getItem("img"),
      });
      console.log(window.localStorage.getItem("name"));
    } else {
      //if cache removed
      history.push("/");
    }
  }, []);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  useEffect(() => {
    if (userData.name === window.localStorage.getItem("name")) {
      setIsValid(false);
    }
  }, [userData.name]);

  const pickImgHandler = () => {
    filePickRef.current.click();
  };
  const pickedHandler = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      setFile(e.target.files[0]);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!isValid) {
      return;
    }
    const formData = new FormData();
    formData.append("fbid", userData.fbid);
    formData.append("name", userData.name);
    formData.append("img", file);
    sendRequset("https://serr-secret.herokuapp.com/api/user", "PATCH", formData)
      .then((data) => {
        console.log(data);
        window.localStorage.setItem("name", data.result.name);
        if (file) {
          window.localStorage.setItem("img", data.result.img);
        }
        setIsValid(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const nameInputChangeHandler = (e) => {
    setUserData((prev) => ({ ...prev, name: e.target.value }));
    setIsValid(true);
  };

  const onLinkClickHandler = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(link);
    toast("copied to clipb");
  };

  return (
    <ProfileSection>
      {isError && (
        <ErrorModal
          showModal={isError}
          setShowModal={setIsError}
          header={"حدث خطأ ما"}
          body={error}
          buttonText={"اغلاق"}
          oncancel={errorHandler}
        />
      )}
      <ProfileContent onSubmit={formSubmitHandler}>
        <div className={`loader-container ${!isLoading && "fade-out"}`}>
          <img src={gifLoader} />
        </div>
        <input
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.png,.jpeg"
          ref={filePickRef}
          onChange={pickedHandler}
        />
        <Img src={previewUrl ? previewUrl : userData.img} alt="preview" />
        <UploadImg type="button" onClick={pickImgHandler}>
          تغيير الصورة الشخصية
        </UploadImg>
        <h5>الرابط الخاص بك(اضغط للنسخ)</h5>
        <h5
          onClick={onLinkClickHandler}
          style={{
            marginTop:"0.5rem",
            color: "#e65252",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {link}
        </h5>
        <Input
          type="text"
          placeholder="اسم المستخدم"
          onChange={nameInputChangeHandler}
          value={userData.name}
        />
        <Input
          type="text"
          placeholder="البريد الالكتروني"
          value={userData.email}
          disabled
        />
        <ButtonsWrapper>
          <UpdateButton isValid={isValid} type="submit">
            تحديث
          </UpdateButton>
          <ForgetButton>نسيت كلمة المرور</ForgetButton>
        </ButtonsWrapper>
      </ProfileContent>
    </ProfileSection>
  );
};

export default Profile;
