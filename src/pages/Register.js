import React, { useState, useEffect, useContext } from "react";
import GroupIcon from "@material-ui/icons/Group";
import {
  Link,
  Button,
  Typography,
  makeStyles,
  CssBaseline,
  Box,
  TextField,
  Grid,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { AuthContext } from "../context/AuthProvider";
import Appbar from "../components/Appbar";
import Copyright from "../components/CopyRight";

// creating styles using makestyles hook from material ui
const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    margin: theme.spacing(2),
  },
  heading: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "auto",
    paddingRight: "25px",
  },
  icon: {
    margin: theme.spacing(2),
    height: 60,
    color: "black",
  },
  submit: {
    margin: theme.spacing(2),
  },
}));

const Register = (props) => {
  // state variable object for the form variables
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const context = useContext(AuthContext);

  // state variables for error messages, comes from backend where validation is done
  const [errors, setErrors] = useState({});

  // error state variables used to display error messages in the form
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  // form variables changing function
  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // Whenever form submits if there are errors then the state error variables must be changed
  useEffect(() => {
    if (errors.firstName !== undefined) {
      setFirstNameError(true);
    }
    if (errors.lastName !== undefined) {
      setLastNameError(true);
    }
    if (errors.email !== undefined) {
      setEmailError(true);
    }
    if (errors.password !== undefined) {
      setPasswordError(true);
    }
    if (errors.confirmPassword !== undefined) {
      setConfirmPasswordError(true);
    }
  }, [errors]);

  // running the mutation to register user
  const [addUser] = useMutation(REGISTER_USER, {
    update(_, result) {
      context.login(result.data.registerUser);
      props.history.push("/dashboard");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: formValues,
  });

  // function that runs on form submission
  const onSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  // Material UI styles hook
  const classes = useStyles();

  return (
    <>
      <CssBaseline>
        <Appbar />

        <Box variant="container" className={classes.header}>
          <span className={classes.heading}>
            <GroupIcon className={classes.icon} fontSize="large" />
            <Typography variant="h4">Register</Typography>
          </span>
        </Box>

        <form noValidate>

          <Grid container>

            <Grid item xs={1} sm={3} md={4} />

            <Grid container item xs={10} sm={6} md={4} spacing={2}>

              <Grid item xs={12} sm={6}>
                <TextField
                  error={firstNameError}
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoComplete="off"
                  value={formValues.firstName}
                  onChange={onChange}
                  autoFocus
                  helperText={errors.firstName}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoComplete="off"
                  value={formValues.lastName}
                  onChange={onChange}
                  error={lastNameError}
                  helperText={errors.lastName}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  value={formValues.email}
                  onChange={onChange}
                  error={emailError}
                  helperText={errors.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
                  value={formValues.password}
                  onChange={onChange}
                  error={passwordError}
                  helperText={errors.password}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="confirmPassword"
                  label="Re-type Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="off"
                  value={formValues.confirmPassword}
                  onChange={onChange}
                  error={confirmPasswordError}
                  helperText={errors.confirmPassword}
                />
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onSubmit}
              >
                Sign Up
              </Button>

              <Grid container item justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>

            </Grid>

            <Grid item xs={1} sm={3} md={4} />

          </Grid>
          
        </form>

        <Box mt={5}>
          <Copyright />
        </Box>
      </CssBaseline>
    </>
  );
};

// Mutation to register users
const REGISTER_USER = gql`
  mutation registerUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      registerInput: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      firstName
      lastName
      password
      token
    }
  }
`;

export default Register;
