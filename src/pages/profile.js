import React, { useState, useEffect, useContext } from "react";
import {
  ProfileSection,
  ProfileContent,
  Img,
  UploadImg,
} from "./styles/profileElments";
import profilePic from "../assets/profile_pic.png";
import { useHttpCleint } from "../hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";

const Profile = () => {
  const auth = useContext(AuthContext);
  const { isError, isLoading, error, errorHandler, sendRequset, setIsError } =
    useHttpCleint();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    img: "",
  });
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      setUserData({
        name: auth.name || window.localStorage.getItem("name"),
        email: auth.email || window.localStorage.getItem("email"),
        img: auth.img || window.localStorage.getItem("img"),
      });
    }else{
      //if cache removed
      sendRequset().then(()=>{}).catch((err)=>{})
    }
  }, []);
  return (
    <ProfileSection>
      <ProfileContent>
        <input
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.png,.jpeg"
        />
        <Img src={profilePic} alt="preview" />
        <UploadImg>تغيير الصورة الشخصية</UploadImg>
      </ProfileContent>
    </ProfileSection>
  );
};

export default Profile;
