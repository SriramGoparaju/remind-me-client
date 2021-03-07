import { CssBaseline, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import AddCommentIcon from "@material-ui/icons/AddComment";
import MailIcon from "@material-ui/icons/Mail";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import Appbar from "../components/Appbar";
import image from "../images/undraw_Taking_notes_re_bnaf.svg";

const useStyles = makeStyles((theme) => ({
      image: {
            width: "80%",
            [theme.breakpoints.down("md")]: {
                  width: "90%",
                  marginLeft: theme.spacing(2),
                  marginTop: theme.spacing(4),
            },
            [theme.breakpoints.down("sm")]: {
                  width: "70%",
                  marginTop: theme.spacing(1),
                  marginLeft: theme.spacing(6),
            },
      },
      mainContainer: {
            display: "flex",
            width: "100%",
            height: "88vh",
            padding: "2rem",
            boxSizing: "border-box",
            [theme.breakpoints.down("sm")]: {
                  flexDirection: "column",
            },
            [theme.breakpoints.down("md")]: {
                  alignItems: "center",
            },
      },
      textContainer: {
            width: "50%",
            height: "80%",
            [theme.breakpoints.down("md")]: {
                  width: "60%",
            },
            [theme.breakpoints.down("sm")]: {
                  width: "100%",
            },
      },
      text: {
            marginTop: theme.spacing(10),
            marginLeft: theme.spacing(6),
            marginRight: theme.spacing(4),
            [theme.breakpoints.down("md")]: {
                  marginTop: theme.spacing(4),
                  marginLeft: theme.spacing(3),
                  marginRight: theme.spacing(0),
            },
            [theme.breakpoints.down("sm")]: {
                  marginTop: theme.spacing(1),
                  marginLeft: theme.spacing(0),
                  marginRight: theme.spacing(0),
            },
      },
      supportText: {
            marginLeft: theme.spacing(6),
            marginTop: theme.spacing(2),
            marginRight: theme.spacing(4),
            [theme.breakpoints.down("md")]: {
                  marginTop: theme.spacing(1),
                  marginLeft: theme.spacing(3),
                  marginRight: theme.spacing(0),
            },
            [theme.breakpoints.down("sm")]: {
                  marginTop: theme.spacing(2),
                  marginLeft: theme.spacing(0),
                  marginRight: theme.spacing(0),
            },
      },
      imageContainer: {
            width: "50%",
            height: "80%",
            paddingTop: "3rem",
            [theme.breakpoints.down("md")]: {
                  width: "40%",
            },
            [theme.breakpoints.down("sm")]: {
                  width: "100%",
            },
      },
      iconContainer: {
            display: "flex",
            marginTop: theme.spacing(7),
            marginLeft: theme.spacing(4),
            [theme.breakpoints.down("sm")]: {
                  marginTop: theme.spacing(4),
                  marginLeft: theme.spacing(0),
            },
      },
      iconItem: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: theme.spacing(3),
      },
      iconText: {
            marginTop: theme.spacing(1),
            fontSize: "1.2rem",
      },
}));

export default function Home() {
      const classes = useStyles();

      return (
            <>
                  <CssBaseline />
                  <Appbar />
                  <div className={classes.mainContainer}>
                        <div className={classes.textContainer}>
                              <Typography className={classes.text} variant="h3">
                                    Welcome to Remind Me
                              </Typography>

                              <Typography
                                    variant="h5"
                                    className={classes.supportText}
                              >
                                    Add your important events here and forget
                                    them.
                              </Typography>
                              <div className={classes.iconContainer}>
                                    <div className={classes.iconItem}>
                                          <AddCommentIcon
                                                className={classes.icon}
                                                fontSize="large"
                                                color="primary"
                                          />
                                          <Typography
                                                className={classes.iconText}
                                                variant="subtitle1"
                                          >
                                                Add events
                                          </Typography>
                                    </div>
                                    <div className={classes.iconItem}>
                                          <MailIcon
                                                className={classes.icon}
                                                fontSize="large"
                                                color="primary"
                                          />
                                          <Typography
                                                className={classes.iconText}
                                                variant="subtitle1"
                                          >
                                                Recieve mails
                                          </Typography>
                                    </div>
                                    <div className={classes.iconItem}>
                                          <CheckCircleIcon
                                                className={classes.icon}
                                                fontSize="large"
                                                color="primary"
                                          />
                                          <Typography
                                                className={classes.iconText}
                                                variant="subtitle1"
                                          >
                                                Complete tasks
                                          </Typography>
                                    </div>
                              </div>
                        </div>
                        <div className={classes.imageContainer}>
                              <img
                                    src={image}
                                    alt=""
                                    className={classes.image}
                              />
                        </div>
                  </div>
            </>
      );
}
