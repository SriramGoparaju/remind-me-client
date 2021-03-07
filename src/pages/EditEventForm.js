import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  CssBaseline,
  Typography,
  Box,
  makeStyles,
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { gql, useMutation, useQuery } from "@apollo/client";

import { AuthContext } from "../context/AuthProvider";
import DashAppBar from "../components/DashAppBar";
import Copyright from "../components/CopyRight";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    margin: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  heading: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "auto",
    paddingRight: "25px",
  },
  icon: {
    margin: theme.spacing(1),
    height: 60,
    color: "black",
  },
  submit: {
    margin: theme.spacing(2),
  },
  submitIcon: {
    marginRight: theme.spacing(1),
  },
}));

function EditEventForm(props) {
  const { eventId } = useParams();
  const { user } = useContext(AuthContext);

  console.log(user.id);

  // have to change the initial form values to existing form values
  const [formValues, setFormValues] = useState({
    eventBelongsTo: "",
    priority: "1st",
    eventDate: "2010-06-24",
    eventType: "Birthday",
    reminderType: "Every Year",
  });

  const { data } = useQuery(GET_EVENT, {
    variables: {
      eventId: eventId,
    },
    onCompleted() {
      setFormValues({
        eventBelongsTo: data.getEvent.eventBelongsTo,
        priority: data.getEvent.priority,
        eventDate: data.getEvent.date,
        eventType: data.getEvent.eventType,
        reminderType: data.getEvent.reminderType,
      });
    },
  });

  const classes = useStyles();

  // form variables changing function
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const [editEvent] = useMutation(EDIT_EVENT, {
    update(_, result) {
      props.history.push("/dashboard");
    },
    variables: {
      eventId,
      eventBelongsTo: formValues.eventBelongsTo,
      priority: formValues.priority,
      eventType: formValues.eventType,
      reminderType: formValues.reminderType,
      date: formValues.eventDate,
      userId: user.id,
    },
  });

  const onSubmit = (e) => {
    console.log("clicked");
    editEvent();
    e.preventDefault();
  };

  return (
    <>
      <CssBaseline />
      <DashAppBar />
      <Box variant="container" className={classes.header}>
        <span className={classes.heading}>
          <EditIcon className={classes.icon} fontSize="large" />
          <Typography variant="h4">Edit Event</Typography>
        </span>
      </Box>
      {data && (
        <form noValidate>
          <Grid container>
            <Grid item xs={2} sm={3} />
            <Grid item container xs={8} sm={6} spacing={3}>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  fullWidth
                  id="eventBelongsTo"
                  label="Event belongs to"
                  name="eventBelongsTo"
                  autoFocus
                  autoComplete="off"
                  value={formValues.eventBelongsTo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="priority"
                  select
                  fullWidth
                  label="Priority"
                  value={formValues.priority}
                  onChange={handleChange}
                  name="priority"
                  variant="standard"
                >
                  <MenuItem value="1st">1st</MenuItem>
                  <MenuItem value="2nd">2nd</MenuItem>
                  <MenuItem value="3rd">3rd</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="eventDate"
                  label="Event Date"
                  fullWidth
                  type="date"
                  name="eventDate"
                  value={formValues.eventDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="eventType"
                  select
                  label="Event Type"
                  value={formValues.eventType}
                  onChange={handleChange}
                  name="eventType"
                  fullWidth
                  variant="standard"
                >
                  <MenuItem value="Birthday">Birthday</MenuItem>
                  <MenuItem value="Aniversary">Aniversary</MenuItem>
                  <MenuItem value="Meeting">Meeting</MenuItem>
                  <MenuItem value="Test">Test</MenuItem>
                  <MenuItem value="Trip">Trip</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="reminderType"
                  select
                  label="Reminder Type"
                  value={formValues.reminderType}
                  onChange={handleChange}
                  name="reminderType"
                  variant="standard"
                  fullWidth
                >
                  <MenuItem value="Every Year">Every Year</MenuItem>
                  <MenuItem value="Only this year">Only this year</MenuItem>
                </TextField>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onSubmit}
              >
                <EditIcon className={classes.submitIcon} />
                Edit Event
              </Button>
              <Button
                variant="contained"
                color="primary"
                href="/dashboard"
                className={classes.submit}
              >
                <DeleteIcon className={classes.submitIcon} />
                Discard
              </Button>
            </Grid>

            <Grid item xs={2} sm={3} />
          </Grid>
        </form>
      )}
      <Box mt={5}>
        <Copyright />
      </Box>
    </>
  );
}

const GET_EVENT = gql`
  query getEvent($eventId: String!) {
    getEvent(eventId: $eventId) {
      id
      eventBelongsTo
      priority
      date
      reminderType
      eventType
      userId
    }
  }
`;

const EDIT_EVENT = gql`
  mutation updateEvent(
    $eventId: String!
    $eventBelongsTo: String!
    $date: String!
    $priority: String!
    $reminderType: String!
    $eventType: String!
    $userId: String!
  ) {
    updateEvent(
      updateEventInput: {
        eventId: $eventId
        eventBelongsTo: $eventBelongsTo
        date: $date
        priority: $priority
        reminderType: $reminderType
        eventType: $eventType
        userId: $userId
      }
    ) {
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

export default EditEventForm;
