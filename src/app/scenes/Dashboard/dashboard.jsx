import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Box, Menu, MenuItem } from "@material-ui/core";
import { AccountCircleSharp } from "@material-ui/icons";
import ListIcon from "@material-ui/icons/List";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Logo from "../../../images/5d.png";
import MomentList from "../../components/ListMoment";
import AddMoment from "../../components/AddMoment";
import { dashboardStyle } from "./style";

const useStyles = makeStyles(dashboardStyle);

function Dashboard(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedListItem, setSelectedListItem] = useState("Moment list");
  const [selectedMoment, setSelectedMoment] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    setOpenDropdown(false);
    props.history.push("/");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenDropdown(true);
  };

  const handleClose = () => {
    setOpenDropdown(false);
  };

  const drawer = (
    <div>
      <Box className={classes.topConatiner}>
        <img alt="5D logo" height="150" width="150" src={Logo} />
      </Box>
      <Divider />
      <List>
        {["Moment list", "Add new moment"].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              setSelectedListItem(text);
              setSelectedMoment(null);
            }}
          >
            <ListItemIcon className={classes.listItem}>
              {index % 2 === 0 ? <ListIcon /> : <AddCircleIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton
            color="red !important"
            aria-label="open drawer"
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            className={classes.userAccount}
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClick}
          >
            <AccountCircleSharp />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={openDropdown}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 40 * 4.5,
                width: 200,
              },
            }}
          >
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {selectedListItem === "Moment list" ? (
          <MomentList
            setSelectedListItem={setSelectedListItem}
            setSelectedMoment={setSelectedMoment}
          />
        ) : (
          <AddMoment
            setSelectedListItem={setSelectedListItem}
            setSelectedMoment={setSelectedMoment}
            selectedMoment={selectedMoment}
          />
        )}
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
