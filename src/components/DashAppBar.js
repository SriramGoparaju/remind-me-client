import React, { useContext } from "react";

import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

import ExitToApp from "@material-ui/icons/ExitToApp";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { AuthContext } from "../context/AuthProvider";

const useStyles = makeStyles((theme) => ({
  appbar: {
    height: 90,
    display: "flex",
    justifyContent: "center",
    padding: "0 2rem",
  },
  text: {
    fontFamily: "'Montez'",
    fontWeight: "bold",
    flexGrow: 1,
  },
  icon: {
    margin: "0rem 0.4rem",
  },
  button: {
    margin: "0 1rem",
  },
}));

export default function DashAppBar(props) {
  const context = useContext(AuthContext);
  const classes = useStyles();

  const clickHandler = () => {
    context.logout();
  };

  return (
    <AppBar className={classes.appbar} position="static" color="primary">
      <Toolbar>
        <Typography className={classes.text} variant="h4">
          Remind Me
        </Typography>

        <div className={classes.buttons}>
          <Button
            className={classes.button}
            color="inherit"
            size="large"
            href="/add"
          >
            <AddCircleIcon className={classes.icon} />
            Add Event
          </Button>
          <Button
            className={classes.button}
            color="inherit"
            size="large"
            href="/login"
            onClick={clickHandler}
          >
            <ExitToApp className={classes.icon} />
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
