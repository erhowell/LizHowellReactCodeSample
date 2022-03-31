import React from "react";
import { useDispatch } from "react-redux";
import { Card, Chip, Grid, Link } from "@mui/material";
import PackageSummaryCardProps from "../Models/Props/PackageSummaryCardProps";
import Score from "./Common/Score";
import { deepPurple, grey } from "@mui/material/colors";
import { rdx_searchQuery } from "../Store/Slices/npmSearchSlice";
import { rdx_setQuery } from "../Store/Slices/querySlice";
const PackageSummaryCard = (props: PackageSummaryCardProps) => {
  const dispatch = useDispatch();
  //Search key words
  const onChipClick = (e, val) => {
    if (val) {
      let query = "keywords:" + val;
      dispatch(rdx_searchQuery(query));
      dispatch(rdx_setQuery(query));
    }
  };
  //translates the last updated date to text
  const lastUpdated = () => {
    let date1 = new Date(props.npmPackage.package.date);
    let date2 = new Date();
    // get total seconds between the times
    var delta = Math.abs(date1.getTime() - date2.getTime()) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / (86400 * 365));
    if (days > 0) {
      return days + " days ago";
    }
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    if (hours > 0) {
      return hours + " hours ago";
    }
    delta -= hours * 3600;

    return "less than an hour ago";
  };

  return (
    <>
      {props.npmPackage && (
        <Card
          variant="outlined"
          sx={{
            marginTop: 1,
            padding: 1,
            backgroundColor: grey[200],
            outlineColor: deepPurple[800],
            outlineWidth: 7
          }}
        >
          <Grid container rowSpacing={1} columnSpacing={1}>
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
              >
                <Link href={props.npmPackage.package.links.npm}>
                  <h4>{props.npmPackage.package.name}</h4>
                </Link>
                <p>v {props.npmPackage.package.version}</p>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <p>{props.npmPackage.package.description}</p>
            </Grid>

            <Grid item xs={4}>
              <Score
                name={"popularity"}
                score={props.npmPackage.score.detail.popularity}
              />
            </Grid>
            <Grid item xs={4}>
              <Score
                name={"quality"}
                score={props.npmPackage.score.detail.quality}
              />
            </Grid>
            <Grid item xs={4}>
              <Score
                name={"maintenance"}
                score={props.npmPackage.score.detail.maintenance}
              />
            </Grid>
            {props.npmPackage.package.keywords && (
              <Grid item xs={12}>
                {props.npmPackage.package.keywords.map((value, idx) => {
                  return (
                    <Chip
                      key={"chip" + idx}
                      onClick={(e) => onChipClick(e, value)}
                      label={value}
                    />
                  );
                })}
              </Grid>
            )}
            <Grid item xs={12}>
              <p>
                Updated {lastUpdated()} by{" "}
                {props.npmPackage.package.publisher.username}
              </p>
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
};

export default PackageSummaryCard;
