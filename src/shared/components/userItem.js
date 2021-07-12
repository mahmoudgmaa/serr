import React from "react";
import styled from "styled-components";

const ItemWrapper = styled.div`
  width: 70%;
  height: 8rem;
  align-items: center;
  border-radius: 15px;
  border-color: #e65252;
  border-width: 3px;
  border-style: solid;
  display: flex;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  padding: 5px;
  margin-top: 3.5rem;
`;
const Image = styled.img`
  height: 100%;
  width: 6rem;
  border-radius: 50%;
  margin-left: 1rem;
`;

const UserItem = ({ name, img }) => {
  return (
    <ItemWrapper>
      <Image
        src="https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png"
        alt="userImage"
      />
      <h2>{name}</h2>
    </ItemWrapper>
  );
};

export default UserItem;