const signupStyle = (theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  formControl: {
    width: "80%",
    maxWidth: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  root: {
    padding: "10px 15px 10px 15px",
    width: "95%",
  },
  submit: {
    padding: "6px 30px 6px 30px",
    borderRadius: "30px",
    backgroundColor: "#001b30",
    margin: theme.spacing(3, 0, 2),
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
  },
});

export { signupStyle };
