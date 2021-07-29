import React, { useState, useEffect, useContext } from "react";
import { Tab, Tabs, makeStyles, Box, AppBar } from "@material-ui/core";
import {
  MyMessagesSection,
  MessagesContainer,
} from "./styles/myMessagesElments";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SentIcon from "@material-ui/icons/Send";
import AllMessagesIcon from "@material-ui/icons/Inbox";
import Message from "../shared/components/message/Message";
import { useHttpCleint } from "../hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";
import gifLoader from "../assets/gifLoader.gif";
import "./styles/myMessagesStyle.css";
import empty from "../assets/empty.svg";
import emptyFavourite from "../assets/emptyFavourite.svg";
import emptySend from "../assets/emptySend.svg";
import ErrorModal from "../shared/components/ErrorModal";

const useStyles = makeStyles({
  root: {
    background: "transparent",
    border: "none",
    boxShadow: "none",
    flexGrow: 1,
    width: "100%",
    zIndex: 1,
  },

  tab: {
    fontSize: "2rem",
  },
  icon: {
    width: "2rem",
    height: "2rem",
  },
});

const TabPanel = (props) => {
  const { value, index, children, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      className="tabpanel"
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
};

const MyMessages = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [value, setValue] = React.useState(0);
  const { isError, error, errorHandler, setIsError, isLoading, setIsLoading } =
    useHttpCleint();
  const [messages, setMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [favouriteMessages, setFavouriteMessages] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    fetch(
      `https://serr-secret.herokuapp.com/api/message?fbid=${
        auth.userId || window.localStorage.getItem("userId")
      }`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bear " + auth.token || window.localStorage.getItem("token"),
        },
      }
    ).then(async (res) => {
      const data = await res.json();
      setMessages(data.result);
      setFavouriteMessages(data.result.filter((m) => m.isFavourite === true));
      setIsLoading(false);
    });
    fetch(
      `https://serr-secret.herokuapp.com/api/message/sentMessages?fbid=${
        auth.userId || window.localStorage.getItem("userId")
      }`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bear " + auth.token || window.localStorage.getItem("token"),
        },
      }
    ).then(async (res) => {
      const data = await res.json();
      setSentMessages(data.result);
    });
  }, [value]);

  return (
    <MyMessagesSection>
      {isError && (
        <ErrorModal
          showModal={isError}
          setShowModal={setIsError}
          header={"حدث خطأ ما"}
          body={error}
          buttonText={"اغلاق"}
          oncancel={errorHandler}
        />
      )}
      <div className={`loader-container ${!isLoading && "fade-out"}`}>
        <img src={gifLoader} />
      </div>
      <AppBar position="static" className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor={"secondary"}
          textColor={"secondary"}
          aria-label="scrollable force tabs example"
        >
          <Tab
            label="الواردة"
            icon={<AllMessagesIcon className={classes.icon} />}
            className={classes.tab}
            {...a11yProps(0)}
          />
          <Tab
            label="المفضلة"
            className={classes.tab}
            icon={<FavoriteIcon className={classes.icon} />}
            {...a11yProps(1)}
          />
          <Tab
            label="المرسلة"
            className={classes.tab}
            icon={<SentIcon className={classes.icon} />}
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {messages.length === 0 && (
          <div
            style={{
              paddingTop: "10rem",
              width: "100%",
              height: "100%",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h3>صندوق الاسرار فارغ</h3>
            <img
              style={{
                width: "30rem",
                height: "30rem",
                marginTop: "5rem",
                marginBottom: "3rem",
              }}
              src={empty}
            />
            <h3>قم بمشاركة الرابط الخاص بك لاستقبال اسرار من اصدقائك</h3>
          </div>
        )}
        <MessagesContainer>
          {messages.map((m, index) => {
            return (
              <Message
                isFavourite={m.isFavourite}
                isPublic={m.isPublic}
                id={m._id}
                messageBody={m.messageBody}
                date={m.date}
                key={index}
                mode="total"
                comment={m.comment}
              />
            );
          })}
        </MessagesContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {favouriteMessages.length === 0 && (
          <div
            style={{
              paddingTop: "10rem",
              width: "100%",
              height: "100%",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h3>صندوق الاسرار المفضلة فارغ</h3>
            <img
              style={{
                width: "30rem",
                height: "30rem",
                marginTop: "5rem",
                marginBottom: "3rem",
              }}
              src={emptyFavourite}
            />
          </div>
        )}
        <MessagesContainer>
          {favouriteMessages.map((m, index) => {
            return (
              <Message
                isFavourite={m.isFavourite}
                isPublic={m.isPublic}
                id={m._id}
                messageBody={m.messageBody}
                date={m.date}
                key={index}
                mode="total"
                comment={m.comment}
              />
            );
          })}
        </MessagesContainer>
      </TabPanel>
      <TabPanel value={value} index={2}>
        {sentMessages.length === 0 && (
          <div
            style={{
              paddingTop: "10rem",
              width: "100%",
              height: "100%",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h3>صندوق الاسرار المرسلة فارغ</h3>
            <img
              style={{
                width: "30rem",
                height: "30rem",
                marginTop: "5rem",
                marginBottom: "3rem",
              }}
              src={emptySend}
            />
            <h3>قم بمشاركة اصدقائك بعض الاسرار</h3>
          </div>
        )}
        <MessagesContainer>
          {sentMessages.map((m, index) => {
            return (
              <Message
                isFavourite={m.isFavourite}
                isPublic={m.isPublic}
                id={m._id}
                messageBody={m.messageBody}
                date={m.date}
                key={index}
                mode="sent"
                comment={m.comment}
              />
            );
          })}
        </MessagesContainer>
      </TabPanel>
    </MyMessagesSection>
  );
};

export default MyMessages;
