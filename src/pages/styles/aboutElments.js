import styled from "styled-components";
export const ContactSection = styled.section`
  width: 100vw;
  height: 95vh;
  padding-top: 10rem;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 10rem;
  @media screen and (max-width: 768px) {
    padding-top: 15rem;
  }
`;

export const ImgWrapper = styled.div`
  flex: 1 1 60rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1300px) {
    /* width: 40%; */
    flex: 1 1 30rem;
  }
  @media screen and (max-width: 768px) {
    /* width: 40%; */
    display: none;
  }
`;
export const Img=styled.img`
width: 100%;
height: 100%;

`

export const ContactWrapper = styled.div`
  flex: 1 1 10rem;

  height: 100%;
  /* width: 40%; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const IconsWrapper=styled.div`
margin-top: 3rem;
display: flex;
width: 100%;
justify-content: space-around;
flex-direction: row;
align-items: center;
`

export const Icon=styled.img`
width:5rem;
height: 5rem;
cursor: pointer;

`
