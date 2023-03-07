import { Typography } from "@mui/material";
import React from "react";

const Intro = ({children}) => {
  return (
    <Typography fontWeight={500} variant="h5" align="left" gutterBottom pb={2} >
      {children}
    </Typography>
  );
};

export default Intro;
