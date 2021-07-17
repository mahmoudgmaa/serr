import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useHttpCleint } from "../hooks/http-hook";
import {
  LandingSection,
  Img,
  ImgWrapper,
  Form,
  FormWrapper,
  PublicMessagesWrapper
} from "./LandingPageElments";
import Input from "../shared/components/input";
import { useForm } from "../hooks/form-hook";
import { Button } from "../shared/components/Button";
import { VALIDATOR_MINLENGTH } from "../utils/validators";

const UserLanding = () => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      messageBody: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      const img = location.state.img;
      setUserImg(img);
      console.log(img);
    }
  }, [location]);
  const name = useParams().name;
  const id = useParams().uid;
  const [userImg, setUserImg] = useState();
  const { isError, error, errorHandler, sendRequset, setIsError } =
    useHttpCleint();

  const fetchUserData = async () => {
    if (!location.state) {
      try {
        const data = await sendRequset(
          `https://serr-secret.herokuapp.com/api/user?name=${name}&fbid=${id}`,
          "GET"
        );
        setUserImg(data.result.img);
        console.log("call " + data.result.img);
      } catch (error) {}
    }
    try {
      const data = await sendRequset(
        `https://serr-secret.herokuapp.com/api/message/publicMessages?fbid=${id}`,
        "GET"
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <LandingSection>
      <ImgWrapper>
        <Img src={userImg} />
        <h3>{name}</h3>
      </ImgWrapper>
      <FormWrapper>
        <Form>
          <Input
            element="textArea"
            id="messageBody"
            type="text"
            onInput={inputHandler}
            placeholder="اجعل سرك معبرا عما في داخلك :)"
            validators={[VALIDATOR_MINLENGTH(5)]}
          />
          <Button>ارسال</Button>
        </Form>
      </FormWrapper>
      <hr style={{width:"70%",marginTop:"1rem"}}/>
      <PublicMessagesWrapper></PublicMessagesWrapper>
    </LandingSection>
  );
};

export default UserLanding;
