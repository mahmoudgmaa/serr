import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const ItemWrapper = styled.div`
  width: 100%;
  height: 8rem;
  align-items: center;
  border-color: #d3d3d3;
  border-width: 1px 0 0 0;
  border-style: solid;
  display: flex;
  padding: 5px;
  margin-bottom: 2px;
  cursor: pointer;
`;
const Image = styled.img`
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  margin-left: 1rem;
`;

const BodyWrapper=styled.div`
display: flex;
justify-content:center;
flex-direction: column;
align-items: flex-start;
`
const Name = styled.p`
color: black;
font-weight: bold;
`;
const Username=styled.p`
font-size: 1.2rem;
`

const UserItem = ({ name,username, id, img }) => {
  const history = useHistory();
  const onItemCLickHandler = (name, id) => {
    history.push(
      // "/u/" + name + "/" + id
      {
        pathname: "/u/" + name + "/" + id,
        search: "?query=abc",
        state: { img: img },
      }
    );
  };
  return (
    <ItemWrapper onClick={() => onItemCLickHandler(name, id)}>
      <Image src={img} alt="userImage" />
      <BodyWrapper>
        <Name>{name}</Name>
        <Username>{username}</Username>
      </BodyWrapper>
    </ItemWrapper>
  );
};

export default UserItem;
