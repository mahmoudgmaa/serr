import React from "react";
import { Paper, Tab, Tabs,makeStyles } from "@material-ui/core";
import {MyMessagesSection} from "./styles/myMessagesElments"

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const MyMessages = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <MyMessagesSection>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Paper>
    </MyMessagesSection>
  );
};

export default MyMessages;
