import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// eslint-disable-next-line react/prop-types
export default function StatusSelect({ status, onChangeStatus }) {
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    if (status !== event.target.value) {
      onChangeStatus(event.target.value);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-controlled-open-select-label">change stt</InputLabel>
      <Select
        size="small"
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={status}
        label={status ? "finish" : "unfinished"}
        onChange={handleChange}
      >
        <MenuItem value={false}>unfinished</MenuItem>
        <MenuItem value={true}>finish</MenuItem>
      </Select>
    </FormControl>
  );
}
