import { Stack } from "@mui/system";
import Box from "@mui/system/Box";
import React, { useState } from "react";
import Layout from "./Layout";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  TableFooter,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FilterDialog from "./FilterDialog";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const NativeTable = () => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //bulk
  //select
  const [selected, setSelected] = React.useState("Approve");

  const handleSelectChange = (event) => {
    setSelected(event.target.value);
  };

  //menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //filter dialog
  const [openD, setOpenD] = React.useState(false);

  const handleClickOpenD = () => {
    setOpenD(true);
  };

  const handleCloseD = () => {
    setOpenD(false);
  };

  const dialogProps = {
    open: openD,
    handleClickOpen: handleClickOpenD,
    handleClose: handleCloseD,
  };

  return (
    <>
      <TableContainer sx={{ maxHeight: 900 }} component={Paper}>
        <Grid
          container
          justifyContent="space-around"
          sx={{
            flexDirection: { xs: "column", lg: "row" },
            px: 2,
            py: 2,
          }}
        >
          <Grid auto py={2} px={1}>
            <Button
              sx={{ minWidth: "10%" }}
              size="medium"
              startIcon={<KeyboardArrowDownIcon />}
              variant="outlined"
              color="secondary"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Dashboard
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>Delete (5)</MenuItem>
              <MenuItem onClick={handleClose}>Review (5)</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Grid>
          <Grid xs py={2} px={1}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Search ..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="disabled" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid auto py={2} px={1}>
            <TextField
              size="small"
              sx={{ minWidth: "10%" }}
              id="outlined-select-currency"
              select
              defaultValue="EUR"
              value={selected}
              onChange={handleSelectChange}
            >
              {["Approve", "Edit", "Delete", "Cancel"].map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid auto py={2} px={1}>
            <Button
              color="secondary"
              variant="contained"
              size="medium"
              onClick={handleClickOpenD}
            >
              Filter
            </Button>
            <FilterDialog {...dialogProps} />
          </Grid>
        </Grid>

        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          size="medium" ////cells inherit this
          stickyHeader
          padding="normal" //cells inherit this
        >
          <TableHead>
            <TableRow></TableRow>
            <TableRow>
              <TableCell padding="checkbox" align="left">
                <Checkbox
                // checked={rowCount > 0 && numSelected === rowCount}
                // onChange={onSelectAllClick}
                />
                <Typography component="span" variant="subtitle2">
                  Order Id
                </Typography>
              </TableCell>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Fat&nbsp;(g)</TableCell>
              <TableCell>Carbs&nbsp;(g)</TableCell>
              <TableCell>Protein&nbsp;(g)</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell padding="checkbox" align="left">
                  <Checkbox
                  // checked={isItemSelected}
                  />
                  <Typography component="span" color="secondary">
                    #5660
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.fat}</TableCell>
                <TableCell>{row.carbs}</TableCell>
                <TableCell>{row.protein}</TableCell>

                <TableCell align="center">
                  <IconButton>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteOutlineIcon />
                  </IconButton>
                  <IconButton
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    // anchorEl={anchorEl}
                    // open={open}
                    onClose={handleClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleClose}>Delete (5)</MenuItem>
                    <MenuItem onClick={handleClose}>Review (5)</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default NativeTable;
