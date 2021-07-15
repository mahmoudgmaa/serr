import styled from "styled-components"

export const SearchScreenSection = styled.section`
  width: 100vw;
  height: 80vh;
  padding-top: 28rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 768px) {
    padding-top: 25rem;
  }
`;

export const ItemsContainer = styled.div`
  width: 60%;
  /* height: ${({ searched }) => (searched ? "68%" : "55%")}; */
  background: #fff;
  position: relative;
  border-radius: 10px;
  top: ${({ searched }) => (searched ? "0%" : "-40%")};
  transition: 1s ease-in-out;
  /* &.searched {
    top: 0%;
  } */
  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;
export const SearchWrapper = styled.div`
  width: 100%;
  height: 5.5rem;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
`;

export const TopPartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 60%;
  height: 65%;
  z-index: 5;
  background: #fffaf7;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

export const Img = styled.img`
  width: 10rem;
  height: 10rem;
`;

export const NoUserText = styled.p`
  color: #e65252;
  align-self: flex-start;
  font-size: 1.3rem;
`;