import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { StepContent, Typography } from "@mui/material";

const steps = [
  "Select master blaster campaign settings",
  "Create an ad group",
  "Create an ad",
];

export default function Basic() {
  return (
    <Box sx={{ width: "100%" }} my={4}>
      <Typography>
        Steppers Types of Steps: Editable, Non-editable, Mobile, Optional
      </Typography>
      <Typography>
        Types of Steppers: Horizontal(can be linear or no linear), Vertical(can
        be linear or no linear)
      </Typography>

      <Typography variant="h3" my={4}>
        Basic
      </Typography>

      <Stepper
        activeStep={1} //add -1 to disable all
        alternativeLabel //adds the label below steps//remove to have labels next to steps
        // connector={<ColorLibConnector />} //pass custom connector//default is StepConnector
        //orientation="vertical" //changes direction to vertical//default is horizontal
        //nonLinear //disables linear flow//remove to default to linear or set false//it uses stepButton instead of steplabel
        //here, you can click a btn to go to any step//then click complete step// this step is now complete//do same to others until all are completed in any order
        //you have to mark each step completed//store steps in object or array
        //when removed, stepper marks every step smaller than activeStep have completed={true} = adds a tick//no tick in nonlinear flow
        //connector={<StepConnector /> //added by default //add with sx={} to customize
      >
        {steps.map((label, i) => {
          return (
            <Step
              key={label}
              //active //makes step active//passed to label/btn
              //completed // makes step completed--use this bool with non-linear flow
              //disabled // makes step disabled
            >
              <StepLabel
                //adds additional text to label eg alert message//s/last step/ optional={<>Alert message if failed<>}
                //for optional step(a step you add a skip button to skip)// add this label as "optional"
                optional={
                  i === 2 ? (
                    <Typography color="error" variant="caption">
                      Last step/Alert message
                    </Typography>
                  ) : null
                }
                // StepIconComponent={ColorLibStepIcon} //add custom step icon//default <StepIcon />
                // StepIconProps ={{error: true/false, completed, active}}//ignore//use active/completed in step  //modifies default stepIcon based on state
              >
                {label}
              </StepLabel>
              {/* instead of stepper label, you can use StepButton with nonlinear navigate-able stepper */}
              {/* <StepButton optional={ad text like in label} onClick={}>

              </StepButton> */}
              {/* //only for vertical stepper//this is where you add content/// it collapses  and or// back /skip/next btns */}
              <StepContent
              //TransitionComponent default is collapse
              >
                <Typography variant="body2" color="text.secondary">
                  This is step content
                </Typography>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
