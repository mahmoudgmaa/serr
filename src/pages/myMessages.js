import React, { useState, useEffect, useContext } from "react";
import {
  Tab,
  Tabs,
  makeStyles,
  Box,
  Typography,
  AppBar,
} from "@material-ui/core";
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
  const { isError, error, errorHandler, sendRequset, setIsError, isLoading } =
    useHttpCleint();
  const [messages, setMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [favouriteMessages, setFavouriteMessages] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    sendRequset(
      `https://serr-secret.herokuapp.com/api/message?fbid=${
        auth.userId || window.localStorage.getItem("userId")
      }`,
      "GET",
      null,
      {
        Authorization:
          "Bear " + auth.token || window.localStorage.getItem("token"),
      }
    )
      .then((data) => {
        setMessages(data.result);
        setFavouriteMessages(data.result.filter((m) => m.isFavourite === true));
      })
      .catch((err) => {});
    sendRequset(
      `https://serr-secret.herokuapp.com/api/message/sentMessages?fbid=${
        auth.userId || window.localStorage.getItem("userId")
      }`,
      "GET",
      null,
      {
        Authorization:
          "Bear " + auth.token || window.localStorage.getItem("token"),
      }
    )
      .then((data) => {
        setSentMessages(data.result);
        console.log(data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <MyMessagesSection>
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
              paddingTop:"10rem",
              width: "100%",
              height: "100%",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent:"center"
            }}
          >
            <h3>صندوق الاسرار فارغ</h3>
            <img style={{ width: "30rem", height: "30rem" }} src={empty} />
            <h3>
              قم بمشاركة الرابط الخاص بك لاستقبال اسرار من
              اصدقائك
            </h3>
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
        <MessagesContainer>
          {messages.map((m, index) => {
            return (
              m.isFavourite && (
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
              )
            );
          })}
        </MessagesContainer>
      </TabPanel>
      <TabPanel value={value} index={2}>
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
