import React from "react";
import contactUsImg from "../assets/contactus.svg";
import {
  ContactSection,
  ImgWrapper,
  ContactWrapper,
  Img,
  Icon,
  IconsWrapper,
} from "./styles/aboutElments";
import facebok from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import gmail from "../assets/gmail.png";
const Aboutus = () => {
  const facebokClickHandler = (e) => {
    e.preventDefault();
    window.open("https://www.facebook.com/serr.secret", "_blank").focus();
  };
   const instagramClickHandler = (e) => {
     e.preventDefault();
     window.open("https://www.instagram.com/serr_app/", "_blank").focus();
   };
   const gmailClickHandler = (e) => {
     e.preventDefault();
     window.open("mailto:serr.app.azem@gmail.com?subject=feedback", "_blank").focus();
     
   };
  return (
    <ContactSection>
      <ImgWrapper>
        <Img src={contactUsImg} />
      </ImgWrapper>
      <ContactWrapper>
        <h3>للشكوي والمقترحات تواصل معنا من خلال</h3>
        <IconsWrapper>
          <Icon src={facebok} onClick={facebokClickHandler} />
          <Icon src={instagram} onClick={instagramClickHandler} />
          <Icon src={gmail} onClick={gmailClickHandler} />
        </IconsWrapper>
      </ContactWrapper>
    </ContactSection>
  );
};

export default Aboutus;
