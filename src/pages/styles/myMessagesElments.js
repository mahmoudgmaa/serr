import styled from "styled-components";

export const MyMessagesSection = styled.section`
  width: 100vw;
  padding-top: 10rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 768px) {
    padding-top: 10rem;
  }
`;

export const MessagesContainer = styled.div`
  overflow-y: auto;
  max-height: 71vh;
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;
