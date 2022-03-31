import { Grid, LinearProgress } from "@mui/material";
import React from "react";
import ScoreProps from "../..//Models/Props/ScoreProps";

const Score = (props: ScoreProps) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <p>{props.name}</p>
      </Grid>
      <Grid item xs={12}>
        <LinearProgress variant="determinate" value={props.score * 100} />
      </Grid>
    </Grid>
  );
};
export default Score;
