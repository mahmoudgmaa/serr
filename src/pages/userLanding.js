import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useHttpCleint } from "../hooks/http-hook";
import {
  LandingSection,
  Img,
  ImgWrapper,
  Form,
  FormWrapper,
  PublicMessagesWrapper,
  SingleMessageWrapper,
} from "./styles/LandingPageElments";
import Input from "../shared/components/input";
import { useForm } from "../hooks/form-hook";
import { Button } from "../shared/components/Button";
import ErrorModal from "../shared/components/ErrorModal";
import { AuthContext } from "../shared/context/auth-context";
import { VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH } from "../utils/validators";

const UserLanding = () => {
  const auth = useContext(AuthContext);
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
  const name = useParams().name;
  const id = useParams().uid;
  const [userImg, setUserImg] = useState();
  const [messageBody, setMessageBody] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [publicMessages, setPublicMessages] = useState([]);
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
      } catch (error) {}
    }
    try {
      const data = await sendRequset(
        `https://serr-secret.herokuapp.com/api/message/publicMessages?fbid=${id}`,
        "GET"
      );
      setPublicMessages(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (location.state) {
      const img = location.state.img;
      setUserImg(img);
      console.log(img);
    }
  }, [location]);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    setMessageBody(formState.inputs.messageBody.value);
  }, [formState]);

  const onFormSubmit = async (e) => {
    let body;
    if (!auth.token) {
      body = JSON.stringify({
        userId: id,
        messageBody: messageBody,
      });
    } else {
      body = JSON.stringify({
        userId: id,
        messageBody: messageBody,
        senderId: auth.userId,
      });
    }
    e.preventDefault();
    console.log(body);
    try {
      const data = await sendRequset(
        "https://serr-secret.herokuapp.com/api/message",
        "POST",
        body,
        { "Content-Type": "application/json" }
      );
      setIsSent(true);
    } catch (error) {}
    setMessageBody("");
    setFormData({
      messageBody: {
        value: "",
        isValid: false,
      },
    });
  };

  return (
    <>
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
      {isSent && (
        <ErrorModal
          showModal={isSent}
          setShowModal={setIsSent}
          header={"تهانينا"}
          body={`تم وصول سرك بنجاح الي ${name}`}
          buttonText={"اغلاق"}
          oncancel={errorHandler}
        />
      )}
      <LandingSection>
        <ImgWrapper>
          <Img src={userImg} />
          <h3>{name}</h3>
        </ImgWrapper>
        <FormWrapper>
          <Form onSubmit={onFormSubmit}>
            <Input
              value={messageBody}
              element="textArea"
              id="messageBody"
              type="text"
              onInput={inputHandler}
              errorText="السر يجب الا يقل عن خمسة احرف ولا يزيد عن الف حرف"
              placeholder="اجعل سرك معبرا عما بداخلك فيما لا يقل عن خمسة احرف :)"
              validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(1000)]}
            />

            <Button disabled={!formState.isValid}>ارسال</Button>
          </Form>
        </FormWrapper>
        <hr style={{ width: "70%", marginTop: "1rem" }} />
        <h2>الرسائل المعلنة</h2>
        <PublicMessagesWrapper>
          {publicMessages.map((m, index) => {
            return (
              <SingleMessageWrapper key={index}>
                <p style={{ wordBreak: "break-word" }}>{m.messageBody}</p>
              </SingleMessageWrapper>
            );
          })}
        </PublicMessagesWrapper>
      </LandingSection>
    </>
  );
};

export default UserLanding;
