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
import AddCircleIcon from "@material-ui/icons/AddCircle";
import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

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
}));

function AddEventForm(props) {
  const classes = useStyles();

  const { user } = useContext(AuthContext);

  const [formValues, setFormValues] = useState({
    eventBelongsTo: "",
    priority: "1st",
    eventDate: "2010-06-24",
    eventType: "Birthday",
    reminderType: "Every Year",
  });

  // form variables changing function
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const [addEvent] = useMutation(CREATE_EVENT, {
    update(_, result) {
      props.history.push("/dashboard");
    },
    variables: { ...formValues, userId: user.id },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    addEvent();
  };

  return (
    <>
      <CssBaseline />
      <DashAppBar />
      <Box variant="container" className={classes.header}>
        <span className={classes.heading}>
          <AddCircleIcon className={classes.icon} fontSize="large" />
          <Typography variant="h4">Add Event</Typography>
        </span>
      </Box>
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
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
              Create Event
            </Button>
          </Grid>

          <Grid item xs={2} sm={3} />
        </Grid>
      </form>
      <Box mt={5}>
        <Copyright />
      </Box>
    </>
  );
}

// Mutation to register users
const CREATE_EVENT = gql`
  mutation createEvent(
    $eventBelongsTo: String!
    $priority: String!
    $eventDate: String!
    $eventType: String!
    $reminderType: String!
    $userId: String!
  ) {
    createEvent(
      createEventInput: {
        eventBelongsTo: $eventBelongsTo
        priority: $priority
        date: $eventDate
        reminderType: $reminderType
        eventType: $eventType
        userId: $userId
      }
    ) {
      id
      eventBelongsTo
      date
      priority
      userId
      eventType
      reminderType
    }
  }
`;

export default AddEventForm;
