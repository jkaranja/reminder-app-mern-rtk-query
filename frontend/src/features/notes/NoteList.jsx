import { Stack } from "@mui/system";
import Box from "@mui/system/Box";
import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Pagination,
  PaginationItem,
  Paper,
  Snackbar,
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

import NoteFilter from "./NoteFilter";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Intro from "../../components/Intro";
import AddIcon from "@mui/icons-material/Add";
import SSPagination from "../../components/SSPagination";
import SS2Pagination from "../../components/SS2Pagination";
import MUIPagination from "../../components/MUIPagination";
import NoteItem from "./NoteItem";

import useDebounce from "../../hooks/useDebounce";
import { deleteNote, selectNotes, getNotes, reset } from "./notesSlice";
import showToast from "../../common/showToast";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useDeleteNoteMutation, useGetNotesQuery } from "./notesApiSlice";

const NoteList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [noteList, setNoteList] = useState([]);

  //filter
  //note: set dates as '', dates are sent as GET query string so undefined or null will be sent as string = true
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [filterError, setFilterError] = useState(null);
  const [cleared, setCleared] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [dateFilter, setDateFilter] = useState("");

  //bulk actions
  const [bulkCheck, setBulkCheck] = useState(false);
  /* ----------------------------------------
   PAGINATION
   ----------------------------------------*/
  //const currentPage = searchParams.get("page") || 1; //for mui render//changes on url change
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1); //for custom pag..
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
    setFilterError(null);
  };
  const handleCloseD = () => {
    setOpenD(false);
    setFilterError(null);
  };

  /* -------------------------------------------------------------
   FETCH NOTES QUERY/RUNS ON MOUNT & WHEN ANY QUERY ARG CHANGES
   ----------------------------------------------------------------*/
  const {
    currentData: data,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery(
    { currentPage, itemsPerPage, debouncedSearchTerm, dateFilter },
    {
      //pollingInterval: 15000,
      //refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
  //store notes in a state to manipulate notes
  useEffect(() => {
    setNoteList(data?.notes || []);
  }, [data]);

  /* ----------------------------------------
   PAGINATION
   ----------------------------------------*/
  //for custom pagination & mui onchange
  const handlePageChange = (page) => {
    setCurrentPage(page);

    debouncedSearchTerm
      ? navigate(`/notes?page=${page}&q=${debouncedSearchTerm}`)
      : navigate(`/notes?page=${page}`); //update url
  };

  useEffect(() => {
    setTotalPages(data?.pages);
  }, [data]);

  /* ----------------------------------------
   HANDLE SEARCH URL UPDATE
   ----------------------------------------*/
  //update url with query string
  useEffect(() => {
    setCurrentPage(1);

    if (searchTerm) {
      navigate(`/notes?page=${currentPage}&q=${searchTerm}`);
    }
    if (debouncedSearchTerm && !searchTerm) {
      navigate(`/notes?page=${currentPage}`);
    }
  }, [searchTerm]);

  /* ----------------------------------------
   HANDLE DATE FILTER
   ----------------------------------------*/
  //on submit, set error if empty else set dateFilter to run useQuery//re-fetch
  const handleDateFilter = () => {
    if (!fromDate && !toDate) {
      setFilterError(true);
      return null; //
    }
    setDateFilter({ fromDate, toDate });
    handleCloseD();
  };

  /* ----------------------------------------
   HANDLE CLEAR FILTERS
   ----------------------------------------*/
  const handleClearFilter = () => {
    setFromDate("");
    setToDate("");
    setFilterError(""); //runs useQuery again
  };

  /* ----------------------------------------
   HANDLE CHECKED
   ----------------------------------------*/
  //single check
  const handleChecked = (id) => {
    const newData = noteList.map((note) => {
      if (note.noteId === id) {
        return { ...note, isChecked: note.isChecked ? !note.isChecked : true };
      }
      return note;
    });
    setNoteList(newData);
  };

  //bulk checked
  const handleBulkCheck = () => {
    const newData = noteList.map((note) => {
      return { ...note, isChecked: !bulkCheck };
    });
    setNoteList(newData);
    setBulkCheck(!bulkCheck);
  };
  console.log(error);
  //feedback
  useEffect(() => {
    showToast({
      message: error,
      isLoading: isFetching,
      isError,
      isSuccess,
    });
  }, [isSuccess, isError, isFetching]);

  //dialog props
  const dialogProps = {
    open: openD,
    toDate,
    fromDate,
    setToDate,
    setFromDate,
    handleClickOpen: handleClickOpenD,
    handleClose: handleCloseD,
    handleDateFilter,
    filterError,
    setFilterError,
  };

  return (
    <Box>
      <Box
        sx={{ display: "flex" }}
        justifyContent="space-between"
        alignItems="start"
      >
        <Intro>Notes</Intro>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="secondary"
          onClick={() => navigate("/notes/new")}
        >
          Add new
        </Button>
      </Box>
      <TableContainer sx={{ maxHeight: 800 }} component={Paper}>
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
              <MenuItem onClick={handleClose}>Approve (5)</MenuItem>
              <MenuItem onClick={handleClose}>Delete (5)</MenuItem>
            </Menu>
          </Grid>
          <Grid xs py={2} px={1}>
            <TextField
              onChange={(e) =>
                setSearchTerm(e.target.value?.trim()?.toLowerCase())
              }
              value={searchTerm}
              size="small"
              fullWidth
              color="secondary"
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton color="dark">
                      <SearchIcon onClick={() => {}} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              // onKeyPress={handleSearchQuery}
            />
          </Grid>

          <Grid auto py={2} px={1}>
            <Button
              startIcon={<SettingsIcon />}
              color="secondary"
              variant="outlined"
              size="medium"
              onClick={handleClickOpenD}
            >
              Filter
            </Button>
            <NoteFilter {...dialogProps} />
          </Grid>
        </Grid>

        <Grid2
          color="primary.main"
          p={3}
          container
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid2 flexGrow={1}>
            <Typography px pt variant="body2">
              {isFetching ? (
                <CircularProgress sx={{ color: "grey.dark" }} size={20} />
              ) : (
                `${searchTerm && `Results matching term= '${searchTerm}',`} 
                ${(fromDate || toDate) && `Filter`}
                ${
                  fromDate &&
                  `from date = ${fromDate?.toLocaleDateString?.("en-GB")},`
                }
                 ${
                   toDate &&
                   `up to date = ${toDate?.toLocaleDateString?.("en-GB")},`
                 }                
                
                `
              )}
            </Typography>
          </Grid2>

          <Grid2>
            <Button
              color="error"
              onClick={handleClearFilter}
              variant="outlined"
              sx={{ float: "right" }}
            >
              Clear filter
            </Button>
          </Grid2>
        </Grid2>

        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          size="small"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell
                padding="checkbox"
                align="left"
                sx={{ minWidth: "11%" }}
              >
                <Box
                  sx={{ display: "flex" }}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Checkbox checked={bulkCheck} onChange={handleBulkCheck} />
                  <Typography component="span" variant="subsearchTerm2">
                    Order Id
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Date created</TableCell>
              <TableCell>Deadline</TableCell>

              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {noteList?.map((note) => (
              <NoteItem
                key={note.noteId}
                note={note}
                handleChecked={handleChecked}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box py={4}>
        {/* <SS2Pagination
          currentPage={currentPage}
          pages={totalPages}
          setCurrentPage={handlePageChange}
        /> */}
        {/* <SSPagination
          page={currentPage}
          pages={totalPages}
          changePage={handlePageChange}
        />
         */}
        <MUIPagination
          count={totalPages}
          page={currentPage}
          //redirect="/notes?page" //when using render item
          changePage={handlePageChange}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </Box>
    </Box>
  );
};

export default NoteList;
