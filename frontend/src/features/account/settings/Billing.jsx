import { Box, FormControlLabel, List, ListItem, ListItemIcon, ListItemText, Paper, Radio, RadioGroup, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react'

const Billing = () => {
  //pricing plans
  const [alignment, setAlignment] = React.useState("left");

  
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };



  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h6" gutterBottom mb={3}>
        Billing/subscriptions
      </Typography>
      <List>
        <Typography variant="h6" gutterBottom pt={3} px={2}>
          Subscription Plan
        </Typography>
        {/* <ListSubheader>Subscription Plan</ListSubheader> */}
        <ListItem>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              Monthly
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              Yearly
            </ToggleButton>
          </ToggleButtonGroup>
        </ListItem>

        {[...Array(5)].map((item, i) => {
          return (
            <ListItem divider={i !== 4} dense>
              {/* <ListItemButton> */}
              <ListItemIcon>
                <RadioGroup value={value} onChange={handleChange}>
                  <FormControlLabel value={i} control={<Radio />} />
                </RadioGroup>
              </ListItemIcon>
              <ListItemText primary="Free" secondary="Up to 2 team members" />
              <Typography variant="h6">$30</Typography>
              {/* </ListItemButton> */}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default Billing