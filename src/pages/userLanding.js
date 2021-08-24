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
} from "./styles/LandingPageElments";
import Input from "../shared/components/input";
import { useForm } from "../hooks/form-hook";
import { Button } from "../shared/components/Button";
import ErrorModal from "../shared/components/ErrorModal";
import { AuthContext } from "../shared/context/auth-context";
import { VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH } from "../utils/validators";
import Message from "../shared/components/message/Message";
import gifLoader from "../assets/gifLoader.gif";
import notFound from "../assets/not_found.svg";

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
  const id = useParams().uid;
  const [name, setName] = useState();
  const [userImg, setUserImg] = useState();
  const [messageBody, setMessageBody] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [publicMessages, setPublicMessages] = useState([]);
  const { isError, error, errorHandler, sendRequset, setIsError, isLoading } =
    useHttpCleint();
  const [isExist, setIsExist] = useState(true);

  const fetchUserData = async () => {
    if (!location.state) {
      try {
        const data = await sendRequset(
          `https://serr-secret.herokuapp.com/api/user?fbid=${id}`,
          "GET"
        );
        setUserImg(data.result.img);
        setName(data.result.name);
      } catch (error) {
        console.log(error);
        setIsExist(false);
      }
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
      setName(location.state.name);
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
      <LandingSection>
        {isExist ? (
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
            <ImgWrapper>
              <Img src={userImg} />
              <h2>{name}</h2>
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
                  validators={[
                    VALIDATOR_MINLENGTH(5),
                    VALIDATOR_MAXLENGTH(1000),
                  ]}
                />

                <Button disabled={!formState.isValid}>ارسال</Button>
              </Form>
            </FormWrapper>
            <hr style={{ width: "70%", marginTop: "1rem" }} />
            <div className={`loader-container ${!isLoading && "fade-out"}`}>
              <img src={gifLoader} />
            </div>
            <h2 style={{ marginTop: "3rem" }}>
              {publicMessages.length
                ? "الرسائل المعلنة"
                : "هذا المستخدم لا يملك رسائل معلنة"}
            </h2>
            {publicMessages.length ? (
              <PublicMessagesWrapper>
                {publicMessages.map((m, index) => {
                  return (
                    <Message
                      isFavourite={m.isFavourite}
                      isPublic={m.isPublic}
                      id={m._id}
                      messageBody={m.messageBody}
                      date={m.date}
                      key={index}
                      mode="public"
                      comment={m.comment}
                    />
                  );
                })}
              </PublicMessagesWrapper>
            ) : null}
          </>
        ) : (
          <>
            <img
              src={notFound}
              style={{
                width: "30rem",
                height: "30rem",
                marginTop: "5rem",
                marginBottom: "3rem",
              }}
            />
            <h2>لا يمكن ايجاد هذا المستخدم</h2>
          </>
        )}
      </LandingSection>
    </>
  );
};

export default UserLanding;
