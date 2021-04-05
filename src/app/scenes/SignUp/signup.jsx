import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Logo from "../../../images/5d1.png";
import { IconButton, InputAdornment } from "@material-ui/core";
import {
  HomeOutlined,
  LockOutlined,
  MailOutline,
  PersonOutline,
  PhoneAndroidOutlined,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";

import { signupStyle } from "./style";
import { registerUser } from "../../services/user";

const useStyles = makeStyles(signupStyle);

export default function SignUp(props) {
  const classes = useStyles();
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setUserDetails({ ...userDetails, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setUserDetails({ ...userDetails, showPassword: !userDetails.showPassword });
  };

  const handleSubmit = async () => {
    try {
      await registerUser(userDetails);
      props.history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box className={classes.topContainer}>
        <Box>
          <img alt="5D logo" height="100" width="130" src={Logo} />
        </Box>
      </Box>
      <Box className={classes.middleConatiner}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="span">To be a member</Box>
            <form className={classes.form} noValidate>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    onChange={handleChange("firstName")}
                    label="First Name"
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutline />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    onChange={handleChange("lastName")}
                    autoComplete="lname"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutline />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="mobile"
                    label="Mobile no."
                    name="mobile"
                    onChange={handleChange("phoneNumber")}
                    autoComplete="mobile"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneAndroidOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={handleChange("email")}
                    autoComplete="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutline />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="city"
                    label="City"
                    onChange={handleChange("address")}
                    id="city"
                    autoComplete="city"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    onChange={handleChange("password")}
                    id="password"
                    type={userDetails.showPassword ? "text" : "password"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {userDetails.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Box component="span" className={classes.btnContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  className={classes.submit}
                >
                  Submit
                </Button>
              </Box>
              <Grid container justify="center">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already a member? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </Box>
    </>
  );
}
