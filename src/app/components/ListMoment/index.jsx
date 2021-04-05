import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Avatar, Box, Chip, IconButton, Typography } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { useToasts } from "react-toast-notifications";

import { getMoments, deleteMoment } from "../../services/moment";
import config from "../../../config";

const columns = [
  { id: "no", label: "Sr.No", minWidth: 170 },
  { id: "Image", label: "Image", minWidth: 100 },
  {
    id: "Title",
    label: "Title",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Tags",
    label: "Tags",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Action",
    label: "Action",
    minWidth: 170,
    align: "right",
  },
];

const useStyles = makeStyles({
  root: {
    width: "95%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function MomentTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [moments, setMoment] = useState([]);
  const [total, setTotal] = useState(0);
  const [refetch, setRefetch] = useState(false);
  const { addToast } = useToasts();

  const { setSelectedListItem, setSelectedMoment } = props;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const limit = rowsPerPage;
    const skip = page * limit;
    getMoments({ limit, skip }).then((response) => {
      response.json().then((data) => {
        setMoment(data.data.moments);
        setTotal(data.data.total);
      });
    });
  }, [page, rowsPerPage, refetch]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const hadelDeleteMoment = async (id) => {
    const response = await deleteMoment(id);
    const { data } = await response.json();
    if (response.status === 200) {
      addToast("Successfully deleted", {
        appearance: "success",
        autoDismiss: true,
      });
      setRefetch(!refetch);
    } else {
      addToast(data.msg, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <>
      <Box component="div" pt="20px" pb="20px">
        <Typography variant="h6">Moments</Typography>
      </Box>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {moments.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="left">
                      <Avatar
                        alt="moment image"
                        src={`${config.apiUrl}/${row.image}`}
                      />
                    </TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">
                      {row.tags.map((tag) => (
                        <Chip key={tag} label={tag} />
                      ))}
                    </TableCell>
                    <TableCell align="left">
                      <Box display="flex">
                        <IconButton aria-label="add to shopping cart">
                          <Edit
                            onClick={() => {
                              setSelectedListItem("Add new moment");
                              setSelectedMoment(row);
                            }}
                            color="primary"
                          />
                        </IconButton>
                        <IconButton
                          onClick={(e) => hadelDeleteMoment(row.originalId)}
                          aria-label="add to shopping cart"
                        >
                          <Delete color="secondary" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
