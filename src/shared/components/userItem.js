import React from "react";
import styled from "styled-components";

const ItemWrapper = styled.div`
  width: 100%;
  height: 8rem;
  align-items: center;
  border-color: #d3d3d3;
  border-width: 1px 0 0 0;
  border-style: solid;
  display: flex;
  /* background: #fff; */
  /* box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3); */
  padding: 5px;
  margin-bottom: 2px;
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
      <p>{name}</p>
    </ItemWrapper>
  );
};

export default UserItem;