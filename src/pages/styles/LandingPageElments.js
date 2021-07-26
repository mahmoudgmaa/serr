import styled from "styled-components";

export const LandingSection = styled.section`
  width: 100vw;
  padding-top: 20rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 768px) {
    padding-top: 15rem;
  }
`;
export const ImgWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Img = styled.img`
  width: 10rem;
  height: 10rem;
  margin-bottom: 5px;
`;
export const FormWrapper = styled.div`
  width: 50%;
  margin-top: 3rem;
  font-size: 1.5rem;
  @media screen and (max-width:768px){
    width :80%;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const PublicMessagesWrapper = styled.div`
  max-height: 30rem;
  width: 50%;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;
