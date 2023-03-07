import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function FilterDialog({ open, handleClickOpen, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth //works together with max width
      maxWidth="sm" //default is small
    >
      <DialogTitle>
        <Grid container justifyContent="space-between">
          <Grid>Filter by date</Grid>
          <Grid>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Fill below fields</DialogContentText>
        <Grid container justifyContent="space-between">
          <Grid md={6} textAlign="center" pr={{md: 1}}>
            <TextField margin="dense" label="From" type="email" fullWidth />
          </Grid>
          <Grid md={6} textAlign="center">
            <TextField margin="dense" id="name" label="To" fullWidth />
          </Grid>
          <Grid xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              sx={{ display: "block" }}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Filter</Button>
      </DialogActions>
    </Dialog>
  );
}
