import {
  Box,
  Button,
  Card,
  CardActionArea,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const accountDesc = (
    <Box>
      <Typography variant="h6">Account Information</Typography>
      <Typography variant="body1">Enter Your Account Details</Typography>
      <Grid2 py={2} container justifyContent="space-between">
        <Grid2 xs>
          <TextField
            size="small"
            color="secondary"
            label="Username"
            margin="dense"
            required
            fullWidth
          />
        </Grid2>
        <Grid2 xs sx={{ ml: { md: 2 } }}>
          <TextField
            size="small"
            color="secondary"
            label="Email"
            margin="dense"
            required
            fullWidth
          />
        </Grid2>
      </Grid2>
      <TextField
        size="small"
        color="secondary"
        label="Password"
        margin="dense"
        required
        fullWidth
      />
    </Box>
  );

  const personalDesc = (
    <Box>
      <Typography variant="h6">Personal Information</Typography>
      <Typography variant="body1">Enter Your Personal Information</Typography>
      <Grid2 py={2} container justifyContent="space-between">
        <Grid2 xs>
          <TextField
            size="small"
            color="secondary"
            label="Username"
            margin="dense"
            required
            fullWidth
          />
        </Grid2>
        <Grid2 xs sx={{ ml: { md: 2 } }}>
          <TextField
            size="small"
            color="secondary"
            label="Email"
            margin="dense"
            required
            fullWidth
          />
        </Grid2>
      </Grid2>
      <TextField
        size="small"
        color="secondary"
        label="Password"
        margin="dense"
        required
        fullWidth
      />
    </Box>
  );
  const billingDesc = (
    <Box>
      <Typography variant="h6">Select Plan</Typography>
      <Typography variant="body1">
        Select plan as per your requirement
      </Typography>
      <Grid2 py={2} container justifyContent="space-between">
        <FormControl>
          <RadioGroup
            row //remove for vertical
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="basic"
            name="radio-buttons-group"
            // value={value}
            // onChange={handleRadioChange}
          >
            {[
              { type: "basic", budget: 0 },
              { type: "standard", budget: 99 },
              { type: "enterprise", budget: 499 },
            ].map(({ type, budget }) => (
              <Card key={type} variant="outlined" sx={{  mr: 1 }}>
                <CardActionArea sx={{ p: 2, mr: 1 }}>
                  <Typography
                    variant="h5"
                    align="center"
                    fontWeight="bold"
                    gutterBottom
                    textTransform="capitalize"
                  >
                    {type}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    gutterBottom
                  >
                    A simple start for start ups & Students
                  </Typography>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="secondary"
                    align="center"
                  >
                    ${budget}
                    <Typography variant="caption" color="text.secondary">
                      /month
                    </Typography>
                  </Typography>
                  <Typography align="center">
                    <FormControlLabel
                      control={<Radio color="secondary" />}
                      value={type}
                    />
                  </Typography>
                </CardActionArea>
              </Card>
            ))}
          </RadioGroup>
        </FormControl>
      </Grid2>

      <Typography>Payment Information</Typography>
      <Typography variant="body2">Enter your card information</Typography>

      <TextField
        size="small"
        color="secondary"
        label="Card Number"
        margin="dense"
        required
        fullWidth
      />
      <Grid2 py={2} container>
        <Grid2 xs>
          <TextField
            size="small"
            color="secondary"
            label="Name on Card"
            margin="dense"
            required
            fullWidth
          />
        </Grid2>
        <Grid2 xs sx={{ mx: { md: 2 } }}>
          <TextField
            size="small"
            color="secondary"
            label="Expiry"
            margin="dense"
            required
            fullWidth
          />
        </Grid2>
        <Grid2 xs>
          <TextField
            size="small"
            color="secondary"
            label="CVC"
            margin="dense"
            required
            fullWidth
          />
        </Grid2>
      </Grid2>
    </Box>
  );

  const steps = [
    {
      label: "Account",
      altLabel: "Account Details",
      description: accountDesc,
    },
    {
      label: "Personal",
      altLabel: "Enter Information",
      description: personalDesc,
    },
    {
      label: "Billing",
      altLabel: "Payment Details",
      description: billingDesc,
    },
  ];

  const maxSteps = steps.length;

  //handle next btn

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  //handle back btn
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //handle reset
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box component={Card} p={3}>
      <Stepper activeStep={activeStep}>
        {steps.map(({ label, altLabel }) => (
          <Step key={label}>
            <StepLabel
              optional={<Typography variant="caption">{altLabel}</Typography>}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid2
        container
        minHeight="20vh"
        py={4}
        flexDirection="column"
        justifyContent="space-between"
      >
        {activeStep < maxSteps ? (
          <>
            <Grid2>{steps[activeStep].description}</Grid2>

            <Grid2 py={3}>
              <Box sx={{ display: "flex" }} justifyContent="space-between">
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Back
                </Button>

                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleNext}
                >
                  {activeStep === maxSteps - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </Grid2>
          </>
        ) : (
          <>
            <Typography>All completed!</Typography>
            <Box textAlign="right">
              <Button
                color="secondary"
                variant="contained"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Box>
          </>
        )}
      </Grid2>
    </Box>
  );
};

export default MultiStepForm;
