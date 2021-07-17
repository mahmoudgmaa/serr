import styled from "styled-components";

export const LandingSection = styled.section`
  width: 100vw;
  height: 80vh;
  padding-top: 28rem;
  display: flex;
  justify-content: flex-start;
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
/* height: 200rem; */
width: 70%;
`
