const drawerWidth = 240;

const dashboardStyle = (theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  userAccount: {
    background: "#001b30",
  },
  listItem: {
    color: "#001b30",
  },
  appBar: {
    background: "#fff",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  topConatiner: {
    display: "flex",
    justifyContent: "center",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

export { dashboardStyle };
