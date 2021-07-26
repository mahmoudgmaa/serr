import React, { useState, useContext } from "react";
import {
  SingleMessageWrapper,
  MessageBody,
  IconsWrapper,
  SingleIconWrapper,
  Icon,
  IconTag,
  FooterWrapper,
  Date,
  CommentWrapper,
  Button,
  CommentAndMessageWrapper,
  CommentBody
} from "./messageElments";
import deleteIcon from "../../../assets/delete.png";
import favouriteIcon from "../../../assets/heart.png";
import redFavouriteIcon from "../../../assets/heart-red.png";
import commentIcon from "../../../assets/reply.png";
import shareIcon from "../../../assets/share.png";
import { useHttpCleint } from "../../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";

const Message = ({
  id,
  isFavourite,
  isPublic,
  messageBody,
  date,
  comment,
  mode,
}) => {
  console.log(comment);
  const auth = useContext(AuthContext);
  const [isPublicState, setISPublic] = useState(isPublic);
  const [isFavouriteState, setIsFavourite] = useState(isFavourite);
  const [commentState,setCommentState]=useState(comment)
  const { isError, isLoading, error, errorHandler, sendRequset, setIsError } =
    useHttpCleint();

  const onFavouriteIconClick = async (e) => {
    e.preventDefault();
    setIsFavourite((prev) => !prev);
    await sendRequset(
      "https://serr-secret.herokuapp.com/api/message/setIsFavourite",
      "PATCH",
      JSON.stringify({
        messageId: id,
      }),
      {
        "Content-Type": "application/json",
        Authorization: "Bear " + auth.token,
      }
    );
  };

  const onPublicButtonClick = async (e) => {
    e.preventDefault();
    setISPublic((prev) => !prev);
    await sendRequset(
      "https://serr-secret.herokuapp.com/api/message/setIsPublic",
      "PATCH",
      JSON.stringify({
        messageId: id,
      }),
      {
        "Content-Type": "application/json",
        Authorization:
          "Bear " + auth.token || window.localStorage.getItem("token"),
      }
    );
    console.log(error);
  };

  return (
    <>
      <CommentAndMessageWrapper>
        {comment&&<CommentWrapper>
          <CommentBody>{"الرد: "+commentState}</CommentBody>
          </CommentWrapper>}
        <SingleMessageWrapper>
          <MessageBody>{messageBody}</MessageBody>
          <IconsWrapper>
            <SingleIconWrapper>
              <Icon
                onClick={onFavouriteIconClick}
                src={isFavouriteState ? redFavouriteIcon : favouriteIcon}
              />
              <IconTag>favourite</IconTag>
            </SingleIconWrapper>
            <SingleIconWrapper>
              <Icon src={deleteIcon} />
              <IconTag>delete</IconTag>
            </SingleIconWrapper>
            <SingleIconWrapper>
              <Icon src={commentIcon} />
              <IconTag>reply</IconTag>
            </SingleIconWrapper>
            <SingleIconWrapper>
              <Icon src={shareIcon} />
              <IconTag>share</IconTag>
            </SingleIconWrapper>
          </IconsWrapper>
          <FooterWrapper>
            <Date>{date}</Date>
            <Button isPublic={isPublicState} onClick={onPublicButtonClick}>
              {isPublicState ? "اخفاء عن العامة" : "اظهار للعامة"}
            </Button>
          </FooterWrapper>
        </SingleMessageWrapper>
      </CommentAndMessageWrapper>
    </>
  );
};

export default Message;
