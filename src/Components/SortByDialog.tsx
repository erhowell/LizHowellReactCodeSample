import { useDispatch } from "react-redux";
import React from "react";
import { rdx_ChangeSortBy } from "../Store/Slices/npmSearchSlice";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle
} from "@mui/material";
import { SortByDialogProps } from "../Models/Props/SortByDialogProps";

const SortByDialog = (props: SortByDialogProps) => {
  const dispatch = useDispatch();
  const onSortChange = (e, val) => {
    dispatch(rdx_ChangeSortBy(val));
  };

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>Sort By:</DialogTitle>
      <Box>
        <ToggleButtonGroup
          size="small"
          orientation="vertical"
          color="primary"
          value={props.sortBy}
          exclusive
          onChange={onSortChange}
        >
          <ToggleButton value="Optimal">Optimal</ToggleButton>
          <ToggleButton value="Popularity">Popularity</ToggleButton>
          <ToggleButton value="Quality">Quality</ToggleButton>
          <ToggleButton value="Maintenance">Maintenance</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Dialog>
  );
};

export default SortByDialog;
