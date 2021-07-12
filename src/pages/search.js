import React, { useState } from "react";
import SearchBar from "material-ui-search-bar";
import "./search.css";
import { useHttpCleint } from "../shared/components/http-hook";
import styled from "styled-components";
import UserItem from "../shared/components/userItem";
import logo from "../assets/serr.png"

const ItemsContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 5rem;
`;
const SearchWrapper = styled.div`
  width: 70%;
  height: 5.5rem;
  justify-content: center;
  align-items: center;
  margin-top: 7rem;
`;

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const { isError, isLoading, error, errorHandler, sendRequset, setIsError } =
    useHttpCleint();
  const searchHandler = async () => {
    try {
      const data = await sendRequset(
        `https://serr-secret.herokuapp.com/api/user/search?name=${searchValue}`,
        "GET"
      );
      setSearchedUsers(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="search-container">
          <img src={logo} style={{
              width: "10rem",
              height: "10rem",
          }}/>
        <SearchWrapper>
          <SearchBar
            value={searchValue}
            onChange={(e) => setSearchValue(e)}
            onRequestSearch={searchHandler}
            placeholder="اسم المستخدم المراد البحث عنه"
            style={{
              borderRadius: "10px",
            }}
          />
        </SearchWrapper>
        <ItemsContainer>
          {searchedUsers.map((user) => {
            return <UserItem name={user.name} img={user.img} />;
          })}
        </ItemsContainer>
      </section>
    </>
  );
};

export default Search;
