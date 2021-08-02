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

export const ProfileContent = styled.div`
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
  &:hover {
    background: #fffaf7;
    border: 3px solid #eee;
    color: #000;
  }
`;
