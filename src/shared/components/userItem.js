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
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  margin-left: 1rem;
`;

const UserItem = ({ name, id, img }) => {
  const history = useHistory();
  const onItemCLickHandler = (name, id) => {
    history.push(
      "/u/" + name + "/" + id
      // {
      //   pathname: "/u/" + name + "/" + id,
      //   search: "?query=abc",
      //   state: { img: img },
      // }
    );
  };
  return (
    <ItemWrapper onClick={() => onItemCLickHandler(name, id)}>
      <Image src={img} alt="userImage" />
      <p>{name}</p>
    </ItemWrapper>
  );
};

export default UserItem;
