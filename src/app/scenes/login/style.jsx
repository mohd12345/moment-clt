const loginStyles = (theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  middleConatiner: {
    padding: "30px",
    marginTop: "-26px",
    background: "white",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
  },
  topContainer: {
    alignItems: "center",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#001b30",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    padding: "6px 30px 6px 30px",
    borderRadius: "30px",
    backgroundColor: "#001b30",
    margin: theme.spacing(3, 0, 2),
  },
});

export { loginStyles };
