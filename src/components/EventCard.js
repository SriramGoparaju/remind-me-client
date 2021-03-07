import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AniversaryImage from "../images/aniversary.png";
import BirthdayImage from "../images/birthday.webp";
import MeetingImage from "../images/meeting.png";
import TestImage from "../images/test.jpg";
import TripImage from "../images/trip.jpg";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Countdown from "react-countdown";
import emailjs from "emailjs-com";
import { AuthContext } from "../context/AuthProvider";

import { gql, useMutation } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  card: {
    backgroundColor: "#deeaf5",
  },
  deleteIcon: {
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  editIcon: {
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  cardHead: {
    "& .MuiTypography-h5": {
      fontSize: "2rem",
    },
  },
  date: {
    textAlign: "center",
    fontSize: "1.1rem",
    padding: 0,
  },
  CardContent: {
    padding: "0.5rem 1rem",
  },
  CardActions: {
    padding: "0 0.5rem",
  },
  cardText: {
    fontSize: "1rem",
    lineHeight: "1.7rem",
    fontWeight: 500,
    textAlign: "center",
  },
}));

export default function EventCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const { user } = useContext(AuthContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let backgroundCol = "#deeaf5";
  let image = BirthdayImage;
  if (props.eventType === "Test") {
    image = TestImage;
    backgroundCol = "#c2f0c4";
  } else if (props.eventType === "Aniversary") {
    image = AniversaryImage;
    backgroundCol = "#f1dbe2";
  } else if (props.eventType === "Meeting") {
    image = MeetingImage;
    backgroundCol = "#f2fdb3";
  } else if (props.eventType === "Trip") {
    image = TripImage;
    backgroundCol = "#fae570";
  }

  const link = `/edit/${props.id}`;

  let newDate = new Date(props.date);
  const currentYear = new Date().getFullYear();
  newDate.setFullYear(currentYear);

  const sendEmail = (templateParams) => {
    // template params passes all the parameters required to send the mail
    emailjs
      .send(
        "service_5ditad3",
        "template_2qrk4n7",
        templateParams,
        "user_xXoyb9Zyi9Os1wfJ6FbOm"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  if (newDate < Date.now()) {
    if (
      newDate.getMonth() === new Date().getMonth() &&
      newDate.getDate() === new Date().getDate()
    ) {
      newDate.setFullYear(currentYear);
    } else {
      newDate.setFullYear(currentYear + 1);
    }
  }

  const [deleteEvent] = useMutation(DELETE_EVENT, {
    update(_, result) {
      window.location.reload();
    },
    variables: {
      eventId: props.id,
    },
  });

  const completedMessage = `It is ${props.eventBelongsTo}'s ${props.eventType} today.`;
  // This component is rendered when the event countdown reaches zero
  const Completionist = () => <h2>{completedMessage}</h2>;

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Gets run when the countdown is completed
      // if the event is one time event then remove the event else restart the event
      const today = new Date();
      if (props.reminderType === "Only this year") {
        if (
          (today.getDate() === new Date(newDate).getDate() + 1) &&
          today.getMonth() === new Date(newDate).getMonth() &&
          today.getFullYear() === new Date(newDate).getFullYear()
        ) {
          deleteEvent();
        }
      }

      if(props.reminderType === "Every Year"){
        if (
          (today.getDate() === new Date(newDate).getDate() + 1) &&
          today.getMonth() === new Date(newDate).getMonth() &&
          today.getFullYear() === new Date(newDate).getFullYear()
        ) {
          newDate.setFullYear(currentYear + 1);
        }
      }

      let appropriateMessage, subject;

      if (props.eventType === "Birthday" || props.eventType === "Aniversary") {
        subject = `${props.eventBelongsTo}s ${props.eventType}`;
        appropriateMessage = `It is ${props.eventBelongsTo}'s ${props.eventType} today. Send your wishes to ${props.eventBelongsTo}. Add a message from the remind me team as well.`;
      } else if (props.eventType === "Test" || props.eventType === "Meeting") {
        subject = `${props.eventType} with ${props.eventBelongsTo}`;
        appropriateMessage = `You have a ${props.eventType} with ${props.eventBelongsTo} today. Give your best in the ${props.eventType} today. Good luck`;
      } else if (props.eventType === "Trip") {
        subject = `${props.eventType} with ${props.eventBelongsTo}`;
        appropriateMessage = `You have planned a trip with ${props.eventBelongsTo} today. Enjoy your trip.`;
      }

      sendEmail({
        to_name: `${user.firstName}`,
        subject: `${subject}`,
        from_name: "Remind me",
        message: ` ${appropriateMessage}`,
        send_to: `${user.email}`,
      });
      return <Completionist />;
    } else {
      if (days === 0) {
        return (
          <h3 className={classes.date}>
            {hours} hours : {minutes} min : {seconds} sec
          </h3>
        );
      } else {
        return (
          <h3 className={classes.date}>
            {days} days : {hours} hours : {minutes} min : {seconds} sec
          </h3>
        );
      }
    }
  };

  return (
    <Card style={{ backgroundColor: backgroundCol }}>
      <CardHeader className={classes.cardHead} title={props.eventBelongsTo} />
      <CardMedia
        className={classes.media}
        image={image}
        title="Birthday Cake"
      />
      <CardContent className={classes.CardContent}>
        <Countdown date={new Date(newDate)} renderer={renderer} />
      </CardContent>
      <CardActions className={classes.CardActions} disableSpacing>
        <IconButton
          aria-label="Edit Event"
          href={link}
          className={classes.editIcon}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="Delete Event"
          onClick={() => {
            props.clickOpen(props.id);
          }}
          className={classes.deleteIcon}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body1" className={classes.cardText}>
            Event Belongs to : {props.eventBelongsTo}
          </Typography>
          <Typography variant="body1" className={classes.cardText}>
            Date : {props.date}
          </Typography>
          <Typography variant="body1" className={classes.cardText}>
            Priority : {props.priority}
          </Typography>
          <Typography variant="body1" className={classes.cardText}>
            Reminder Type : {props.reminderType}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const DELETE_EVENT = gql`
  mutation deleteEvent($eventId: String!) {
    deleteEvent(eventId: $eventId)
  }
`;
