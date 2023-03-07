import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Grid,
  Typography,
  TextField,
  ListItemButton,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import { Box } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";

import InputLabel from "@mui/material/InputLabel";
import CloseIcon from "@mui/icons-material/Close";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListSubheader from "@mui/material/ListSubheader";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormLabel from "@mui/material/FormLabel";

import InputAdornment from "@mui/material/InputAdornment";

import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { BootstrapInput } from "../styles";

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

const InputFields = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid
      zeroMinWidth
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      minHeight="90vh"
    >
      <Grid md={4} py={4}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <Box>
          <form>
            <Typography variant="h4" gutterBottom>
              TextField
            </Typography>
            {/* ----------with common props//quick grab text field ------------ */}
            <TextField
              fullWidth
              margin="dense"
              color="secondary"
              size="small"
              label="Text"
              required
              name=""
              value=""
              // onChange={handleChange}
            />
            {/* ----------with common props//quick grab password field------------ */}
            <TextField
              required
              fullWidth
              margin="dense"
              color="secondary"
              size="small"
              //name//as norm text
              // value={name}
              // onChange={handleChange}
              label="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* ----------custom bootstrap input field//not ideal------------ */}
            <FormControl variant="standard">
              <InputLabel color="secondary">Bootstrap</InputLabel>
              <BootstrapInput
                defaultValue="react-bootstrap"
                id="bootstrap-input"
              />
            </FormControl>
            {/* ----------all options------------ */}
            <TextField
              size="small" //only small or remove for normal
              required
              id="outlined-basic"
              label="Email" //if no default value, it is inside//moves to top when you start typing//
              //use InputLabelProps to shrink/move to top without having default value//or to show placeholder
              // fullWidth
              //focused//autoFocus//use focused to focus in advance//moves label to top//adds color
              // margin="dense" //my/none/dense/instead of form group
              placeholder="Placeholder" //only when typing
              // defaultValue="Your email address"//us when component is not controlled//else value //=label moves to top//this stays inside
              //name//as norm text
              //value//as norm text
              //disabled
              //inputRef={ref} //instead of ref//eg reset file input
              // error //use error to show error in advance//ow it will apply when submitting form
              //variant="outlined" //standard//filled//default is outlined
              autoComplete="current-password"
              helperText="min 6 characters/bo spaces"
              type="text" //defualt
              // value={name}
              // onChange={handleChange}
              color="warning" //changes highlight color when focused//
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }} //can take any valid input atribute
            />
            {/* ----------all components that made up textField//use when you need Bootstrap like fields------------ */}
            <FormControl
              variant="standard"
              color="secondary"
              fullWidth
              margin="dense"
              size="small"
            >
              <InputLabel
                color="secondary"
                size="small"
                shrink
                htmlFor="bootstrap-input"
              >
                {" "}
                Name{" "}
              </InputLabel>
              <Input
                id="component-helper"
                defaultValue="Composed TextField"
                aria-describedby="component-helper-text"
              />
              <FormHelperText id="component-helper-text">
                Some important helper text
              </FormHelperText>
            </FormControl>
            {/* ///all components that make textfield - looks like textfield, */}
            <FormControl>
              <InputLabel htmlFor="component-outlined">Name</InputLabel>
              <OutlinedInput
                id="component-outlined"
                defaultValue="Composed TextField"
                label="Name"
              />
            </FormControl>
            {/* ///edit border radius for inputgroup, */}
            <OutlinedInput
              placeholder="To"
              color="secondary"
              size="small"
              sx={{
                borderRadius: "0 4px 4px 0",
              }}
            />
            {/* ------------------------------------------------------------------------ */}
            <Typography variant="h4" gutterBottom>
              Textfield with adornment
            </Typography>
            {/* ----------type1 startAdornment------------ */}
            <TextField
              label="With normal TextField"
              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">kg</InputAdornment>
                ),
              }}
            />
            {/* ----------type1 endAdornment-------PASSWORD----- */}
            <TextField
              required
              id="outlined-basic"
              label="Email"
              margin="dense"
              //name//as norm text
              // value={name}
              // onChange={handleChange}
              color="secondary"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* ----------type2 adornment with form control------------ */}
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={
                  <InputAdornment position="end">kg</InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
              <FormHelperText id="outlined-weight-helper-text">
                Weight
              </FormHelperText>
            </FormControl>
            {/* ----------type3--with input label for password-- sx={{ bgcolor: "white", pr: 2 }} for confirm password-------- */}
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            {/* ------------------------------------------------------------------------ */}
            <Typography variant="h4" gutterBottom>
              Textarea
            </Typography>
            <TextField
              id="outlined-multiline-flexible"
              label="Multiline"
              multiline //makes text textarea
              maxRows={4} //current=1, then it will add scroll after 4//without it//text area will expand with content//current size=1 row
              //minRows={4}//current=4//same as rows={4} but it will expand with content//no scroll
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Multiline"
              multiline
              rows={4} // //it will add scroll after 4//but current textarea rows is 4
              defaultValue="Default Value"
              //   variant="standard" //outline/filled
            />
            {/* ------------------------------------------------------------------------ */}
            <Typography variant="h4" gutterBottom>
              Select with textfield
            </Typography>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              defaultValue="EUR"
              helperText="Please select your currency"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {/* ------------------------------------------------------------------------ */}
            <Typography variant="h4" gutterBottom>
              Select with formcontrol select
            </Typography>
            <FormControl required sx={{ m: 1, minWidth: 120 }} size="small">
              {" "}
              {/* error to hight red */}
              <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                // value={age}
                label="Age"
                // autoWidth
                //autoFocus
                // onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>With label + helper text</FormHelperText>
            </FormControl>
            {/* ------------------------------------------------------------------------ */}
            <Typography variant="h4" gutterBottom>
              Select grouping
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
              <Select defaultValue="" id="grouped-select" label="Grouping">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <ListSubheader>Category 1</ListSubheader>
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <ListSubheader>Category 2</ListSubheader>
                <MenuItem value={3}>Option 3</MenuItem>
                <MenuItem value={4}>Option 4</MenuItem>
              </Select>
            </FormControl>
            {/* ------------------------------------------------------------------------ */}
            <Typography variant="h4" gutterBottom>
              Checkbox
            </Typography>
            <FormGroup>
              <FormControlLabel
                // labelPlacement="top//bottom/start/end"

                control={
                  <Checkbox
                    defaultChecked
                    size="small"
                    color="secondary"
                    // checked={checked}
                    // onChange={handleChange}
                  />
                }
                label="Label"
              />
              <FormControlLabel
                disabled
                control={<Checkbox />}
                label="Disabled"
              />
            </FormGroup>
            {/* ------------------------------------------------------------------------ */}
            <Typography variant="h4" gutterBottom>
              Radio
            </Typography>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                row //remove for vertical
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                // value={value}
                // onChange={handleRadioChange}
              >
                <FormControlLabel
                  labelPlacement="top"
                  value="top"
                  control={<Radio size="small" color="secondary" />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            {/* ------------------------------------------------------------------------ */}
            <Typography variant="h4" gutterBottom>
              Switch
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Switch defaultChecked />} //defaultChecked for uncontrolled switch//no checked
                label="Label"
              />
              <FormControlLabel
                // labelPlacement="top"
                // value="top"
                disabled
                control={
                  <Switch
                    size="small"
                    color="secondary"
                    // checked={checked}
                    // onChange={handleChange}
                  />
                }
                label="Disabled"
              />
            </FormGroup>
            {/* ---------------------or with formcontrol label  //eg --- */}
            <Switch edge="end" defaultChecked /> //edge remove abit of
            margin//not needed
            {/*--------------------------ToggleButtonGroup-------- --------------------  */}
            <ToggleButtonGroup
              value={alignment}
              onChange={handleAlignment}
              aria-label="text alignment"
              orientation="vertical"
              fullWidth
              exclusive //one at a time
            >
              <ToggleButton value="left" aria-label="left aligned">
                <FormatAlignLeftIcon />
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
                <FormatAlignCenterIcon />
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                <FormatAlignRightIcon />
              </ToggleButton>
              <ToggleButton value="justify" aria-label="justified" disabled>
                <FormatAlignJustifyIcon />
              </ToggleButton>
            </ToggleButtonGroup>
            {/* ------------------------------------------------------------------------ */}
            {/* .................list--------------------------------- */}
            <List component={Paper}>
              <ListSubheader>Email Notifications</ListSubheader>//disableGutters
              <ListItem divider={i !== 4} dense>
                {" "}
                dense//py // disablePadding//p //disabledGutters//px
                <ListItemButton>
                  //dense//py // disablePadding//p //disabledGutters//px{" "}
                  .//remove to dsiable hover & click
                  <ListItemIcon>
                    {" "}
                    //or <ListIconAvatar></ListIconAvatar> //for avatar
                    <Avatar>
                      <MailIcon />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary="Email" />
                </ListItemButton>
                <ListItemText primary="Your email" secondary="hello" />
                <FormGroup>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Label"
                  />
                </FormGroup>
              </ListItem>
            </List>
          </form>
        </Box>

        <Divider />
        <Typography variant="h6" component="h2" gutterBottom>
          Welcome back
        </Typography>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default InputFields;
