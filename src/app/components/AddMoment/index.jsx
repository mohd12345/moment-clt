import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";

import {
  Box,
  Chip,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";

import { signupStyle } from "./style";
import { createMoment, updateMoment } from "../../services/moment";
import { useToasts } from "react-toast-notifications";

const useStyles = makeStyles(signupStyle);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tags = ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"];

export default function AddMoment({
  selectedMoment,
  setSelectedListItem,
  setSelectedMoment,
}) {
  const classes = useStyles();
  const { addToast } = useToasts();
  const [moment, setMoment] = useState(
    selectedMoment
      ? {
          title: selectedMoment.title,
          tags: selectedMoment.tags,
          image: "",
        }
      : {
          title: "",
          tags: [],
          image: "",
        }
  );

  const handleChange = (prop) => (event) => {
    setMoment({ ...moment, [prop]: event.target.value });
  };

  const handleDropDownChange = (event) => {
    const encodeImageFileAsURL = (element) => {
      const file = element;
      const reader = new FileReader();
      reader.onloadend = function () {
        setMoment({ ...moment, image: reader.result });
      };
      reader.readAsDataURL(file);
    };
    if (event[0]) {
      encodeImageFileAsURL(event[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      let result;
      if (selectedMoment) {
        result = await updateMoment({
          ...moment,
          id: selectedMoment.originalId,
        });
      } else {
        result = await createMoment(moment);
      }
      if (result.status === 200) {
        addToast(selectedMoment ? "Moment updated" : "A new moment added", {
          appearance: "success",
          autoDismiss: true,
        });
        setSelectedListItem("Moment list");
        setSelectedMoment(null);
      } else {
        addToast("Something went wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box component="div" pt="20px" pb="20px">
        <Typography variant="h6">
          {selectedMoment ? "Update moment" : "Add new moment"}
        </Typography>
      </Box>
      <Paper className={classes.root}>
        <CssBaseline />
        <form className={classes.form} noValidate>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="title"
                defaultValue={moment.title}
                required
                fullWidth
                multiline
                id="title"
                onChange={handleChange("title")}
                label="Title"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Tags</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={moment.tags}
                  onChange={handleChange("tags")}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {tags.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DropzoneArea
                showFileNames
                acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                onChange={handleDropDownChange}
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
        </form>
      </Paper>
    </>
  );
}
