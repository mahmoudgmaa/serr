import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpCleint } from "../hooks/http-hook";

const UserLanding = () => {
  const name = useParams().name;
  const id = useParams().uid;
  const [userImg, setUserImg] = useState("");
  const { isError, error, errorHandler, sendRequset, setIsError } =
    useHttpCleint();

  const fetchUserData = async () => {
    try {
      const data = await sendRequset(
        `https://serr-secret.herokuapp.com/api/user?name=${name}&fbid=${id}`,
        "GET"
      );
      setUserImg(data.result.img);
    } catch (error) {}
    try {
      const data = await sendRequset(
        `https://serr-secret.herokuapp.com/api/message/publicMessages?fbid=${id}`,
        "GET"
      );
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  };


  useEffect(() => {
    fetchUserData();
  }, []);


  return <div></div>;
};

export default UserLanding;
