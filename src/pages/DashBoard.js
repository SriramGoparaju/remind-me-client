import React, { useContext, useState } from "react";
import { CssBaseline, Grid, makeStyles } from "@material-ui/core";
import { useQuery, gql, useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import DashAppBar from "../components/DashAppBar";
import { AuthContext } from "../context/AuthProvider";
import EventCard from "../components/EventCard";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(4),
    width: "100%",
  },
  card: {
    backgroundColor: theme.palette.primary.main,
  },
}));

function DashBoard() {
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState("");

  const { data } = useQuery(GET_EVENTS, {
    variables: {
      userId: user.id,
    },
  });

  const [deleteEvent] = useMutation(DELETE_EVENT, {
    update(_, result) {
      console.log(result);
      window.location.reload();
    },
    variables: {
      eventId: deleteEventId,
    },
  });

  const handleClickOpen = (id) => {
    setDeleteEventId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteEvent = () => {
    deleteEvent();
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <DashAppBar />
      <Grid
        container
        justify="center"
        spacing={5}
        className={classes.cardContainer}
      >
        {data &&
          data.getEvents.map((event) => {
            return (
              <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
                <EventCard
                  id={event.id}
                  {...event}
                  clickOpen={handleClickOpen}
                />
              </Grid>
            );
          })}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete the event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleDeleteEvent}>
            Delete
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            return
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const GET_EVENTS = gql`
  query getEvents($userId: String) {
    getEvents(userId: $userId) {
      id
      eventBelongsTo
      date
      priority
      reminderType
      eventType
      userId
    }
  }
`;

const DELETE_EVENT = gql`
  mutation deleteEvent($eventId: String!) {
    deleteEvent(eventId: $eventId)
  }
`;

export default DashBoard;
