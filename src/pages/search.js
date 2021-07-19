import React, { useState } from "react";
import SearchBar from "material-ui-search-bar";
import "./styles/search.css";
import { useHttpCleint } from "../hooks/http-hook";
import UserItem from "../shared/components/userItem";
import logo from "../assets/serr.png";
import {
  TopPartContainer,
  Img,
  ItemsContainer,
  NoUserText,
  SearchScreenSection,
  SearchWrapper,
} from "./styles/searchElments";
import ErrorModal from "../shared/components/ErrorModal";

const Search = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [noUserFound, setNoUserFound] = useState(false);
  const { isError, error, errorHandler, sendRequset, setIsError } =
    useHttpCleint();
  const searchHandler = async () => {
    setIsSearched(true);
    try {
      const data = await sendRequset(
        `https://serr-secret.herokuapp.com/api/user/search?name=${searchValue}`,
        "GET"
      );
      if (data.result.length === 0) {
        setNoUserFound(true);
        setSearchedUsers([]);
        return;
      }
      setNoUserFound(false);
      setSearchedUsers(data.result);
    } catch (error) {}
  };
  return (
    <>
      {isError && (
        <ErrorModal
          showModal={isError}
          setShowModal={setIsError}
          header={"something went wrong"}
          body={error}
          buttonText={"cancel"}
          oncancel={errorHandler}
        />
      )}
      <SearchScreenSection className="search-container">
        <TopPartContainer>
          <Img src={logo} alt="logo" />
          <SearchWrapper>
            <SearchBar
              value={searchValue}
              onChange={(e) => setSearchValue(e)}
              onRequestSearch={searchHandler}
              placeholder="اسم المستخدم"
              style={{
                borderRadius: "10px",
              }}
            />
          </SearchWrapper>
          {noUserFound && (
            <NoUserText>المستخدم الذي تبحث عنه غير موجود</NoUserText>
          )}
        </TopPartContainer>
        <ItemsContainer searched={isSearched}>
          {searchedUsers.slice(0, 6).map((user, index) => {
            return (
              <UserItem
                name={user.name}
                id={user._id}
                key={index}
                img={user.img}
              />
            );
          })}
        </ItemsContainer>
      </SearchScreenSection>
    </>
  );
};

export default Search;
