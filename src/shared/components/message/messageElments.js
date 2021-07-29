import styled from "styled-components";

export const SingleMessageWrapper = styled.div`
  width: 100%;
  margin: 0 0 15px 0;
  border-radius: 15px;
  flex-wrap: wrap;
  padding: 16px 16px 0 16px;
  display: flex;
  background: #fff;
  color: #fff;
  border: 1px solid #eee;
  z-index: 9;
`;

export const MessageBody = styled.p`
  color: #000;
  font-size: 1.5rem;
  word-break: break-all;
`;
export const IconsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 32px;
  padding: 32px 8px 16px 8px;
  @media screen and (max-width: 768px) {
    justify-content: space-between;
    padding: 16px 8px;
  }
`;
export const SingleIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const Icon = styled.img`
  width: 2rem;
  cursor: pointer;
  height: 2rem;
  transition: all 0.2s ease-in-out;
`;

export const IconTag = styled.p`
  color: #000;
  font-size: 1rem;
`;

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 16px;
`;

export const Date = styled.p`
  color: #000;
  font-size: 1.3rem;
  margin-bottom: 0;
`;

export const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 4px 8px;
  font-size: 1.3rem;
  background: ${({ isPublic }) => (isPublic ? "#d3d3d3" : "#e65252")};
  color: ${({ isPublic }) => (isPublic ? "#000" : "#fff")};
  transition: all 1s ease-in-out;
  &:hover {
    background: #fff;
    border: 2px solid #eee;
    color: #000;
    transition: all 0.2s ease-in-out;
  }
`;

export const CommentWrapper = styled.div`
  width: 96%;
  background: #eee;
  min-height: 50px;
  border-radius: 15px 15px 0 0;
  padding: 25px;
  display: flex;
`;
export const CommentAndMessageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
`;

export const CommentBody = styled.p`
  color: #000;
  font-size: 1.4rem;
  margin-bottom: 0;
  word-break: break-all;
`;

export const CommentInputWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-bottom: 3rem;
  align-items: center;
`;

export const Input = styled.input`
  width: 80%;
  border: none;
  border-radius: 15px;
  background-color: #eee;
  height: 30px;
  border-radius: 5px;
  margin: 0.5rem;
  padding: 10px;
  box-sizing: border-box;
  font-size: 1.3rem;
`;

export const CommentButton = styled.button`
  height: 3rem;
  margin-right: 0.8rem;
  border: none;
  border-radius: 5px;
  padding: 4px 8px;
  font-size: 1.3rem;
  background: ${({ colored }) => (colored ? "#d3d3d3" : "#e65252")};
  color: ${({ colored }) => (colored ? "#000" : "#fff")};
  &:hover {
    background: #fff;
    border: 2px solid #eee;
    color: #000;
  }
`;

export const DeleteWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-bottom: 3rem;
  align-items: center;
`;

export const DeleteText = styled.p`
  color: #000;
  font-size: 1.4rem;
  margin-bottom: 0;
`;
