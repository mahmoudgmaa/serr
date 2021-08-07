import styled from "styled-components";

export const ProfileSection = styled.section`
  height: 100vh;
  width: 100vw;
  padding-top: 10rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const ProfileContent = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;
export const Img = styled.img`
  width: 15rem;
  height: 15rem;
  padding: 8px;
`;

export const UploadImg = styled.button`
  padding: 8px 16px;
  margin-top: 1rem;
  font-size: 1.5rem;
  background: #e65252;
  color: #fff;
  border-radius: 15px;
  border: none;
  margin-bottom: 1rem;
  &:hover {
    background: #fffaf7;
    border: 3px solid #eee;
    color: #000;
  }
`;

export const Input = styled.input`
  height: 40px;
  border-radius: 5px;
  background-color: #eee;
  display: block;
  width: 60%;
  font-size: 14px;
  border-radius: 1rem;
  margin-top: 2rem;
  border: 1px solid #eee;
  padding: 4px 8px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 468px) {
    width: 150%;
  }
`;

export const ButtonsWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 2rem;
  align-items: center;
  @media screen and (max-width: 850px) {
    flex-direction: column;
    justify-content: start;
    align-items: center;    
    width: 80%;

  }
`;

export const UpdateButton = styled.button`
  padding: 8px 40px;
  border-radius: 15px;
  font-size: 1.3rem;
  margin: 0 1rem;
  background: ${({ isValid }) => (!isValid ? "#d3d3d3" : "#e65252")};
  color: ${({ isValid }) => (!isValid ? "#000" : "#fff")};
  &:hover {
    background: ${({ isValid }) => (!isValid ? "#d3d3d3" : "#fff")};
    color: ${({ isValid }) => (!isValid ? "#000" : "#e65252")};
    border: ${({isValid})=>(isValid&&"1px solid #eee")};
    cursor: ${({isValid})=>(isValid?"pointer":"default")} ;
  }
  @media screen and (max-width: 850px) {
    margin-bottom: 10px;
    font-size: 1.5rem;
  }
`;

export const ForgetButton = styled.button`
  padding: 8px 16px;
  border-radius: 15px;
  font-size: 1.3rem;
  border:none;
   &:hover {
    background: #fff;
    color: #e65252;
    border:1px solid #eee;
  }
`;
