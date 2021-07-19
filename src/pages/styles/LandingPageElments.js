import styled from "styled-components";

export const LandingSection = styled.section`
  width: 100vw;
  height: 100vh;
  padding-top: 10rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 768px) {
    padding-top: 25rem;
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
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const PublicMessagesWrapper=styled.div`
background: #fff;
overflow-y: scroll;
/* height: 30rem; */
max-height: 30rem;
width: 50%;
`
export const SingleMessageWrapper=styled.div`
width: 100%;
overflow-y: scroll;
max-height: 30px;
margin: 5px;
border-radius: 10px;
display:flex;
`