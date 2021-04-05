import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Box,
} from "@material-ui/core/";
import {
  VisibilityOff,
  Visibility,
  MailOutline,
  LockOutlined,
} from "@material-ui/icons/";
import { Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { loginStyles } from "./style";
import { loginUser } from "../../services/user";
import Logo from "../../../images/5d.png";

function SignIn(props) {
  const { classes } = props;
  const { addToast } = useToasts();

  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const hanleSubmitClick = async () => {
    const result = await loginUser(values);
    const { data } = await result.json();
    if (result.status === 200) {
      addToast("Successfully login!", {
        appearance: "success",
        autoDismiss: true,
      });
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("token", data);
      props.history.push("/dashboard");
    } else {
      addToast(data.msg, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <>
      <Box className={classes.topContainer}>
        <img alt="5D logo" height="130" width="130" src={Logo} />
      </Box>
      <Box className={classes.middleConatiner}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="span">To start using the app</Box>
            <form className={classes.form} noValidate>
              <TextField
                fullWidth
                required
                onChange={handleChange("email")}
                value={values.email}
                margin="normal"
                id="email"
                label="Enter email address"
                name="email"
                autoComplete="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutline />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                fullWidth
                type={values.showPassword ? "text" : "password"}
                onChange={handleChange("password")}
                value={values.password}
                margin="normal"
                name="password"
                label="Enter password"
                id="password"
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box component="span" className={classes.btnContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={hanleSubmitClick}
                >
                  Sign In
                </Button>
              </Box>
              <Grid container justify="center">
                <Grid item>
                  <Link href="/sign-up" variant="body2">
                    Not a member? Sign Up
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

export default withStyles(loginStyles)(SignIn);
