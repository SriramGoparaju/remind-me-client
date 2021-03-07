import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  makeStyles,
  CssBaseline,
  Box,
  Grid,
  Button,
  Link,
  TextField,
} from "@material-ui/core";
import LibraryAddCheck from "@material-ui/icons/LibraryAddCheck";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../context/AuthProvider";
import Appbar from "../components/Appbar";
import Copyright from "../components/CopyRight";

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

const Login = (props) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const context = useContext(AuthContext);

  // error state variables used to display error messages in the form
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // state variables for error messages, comes from backend where validation is done
  const [errors, setErrors] = useState({});

  // form variables changing function
  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // Whenever form submits if there are errors then the state error variables must be changed
  useEffect(() => {
    if (errors.email !== undefined) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (errors.password !== undefined) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [errors]);

  // running the mutation to register user
  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, result) {
      context.login(result.data.loginUser);
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
    loginUser();
  };

  // styles from makestyles hook from material ui
  const classes = useStyles();

  return (
    <>
      <CssBaseline>
        <Appbar />
        <Box variant="container" className={classes.header}>
          <span className={classes.heading}>
            <LibraryAddCheck className={classes.icon} fontSize="large" />
            <Typography variant="h4">Login</Typography>
          </span>
        </Box>
        <form noValidate>
          <Grid container>
            <Grid item xs={1} sm={3} md={4} />
            <Grid container item xs={10} sm={6} md={4} spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onSubmit}
              >
                Login
              </Button>
              <Grid container item justify="flex-end">
                <Grid item>
                  <Link href="/register" variant="body2">
                    Haven't registered yet? Register
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
const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      email
      firstName
      lastName
      password
      token
    }
  }
`;

export default Login;
