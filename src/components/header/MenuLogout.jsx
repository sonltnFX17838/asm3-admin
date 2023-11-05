import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Avatar, Button, IconButton } from "@mui/material";
import sessionAdmin from "../../utils/sessionAdmin";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MenuLogout() {
  const host = import.meta.env.VITE_REACT_API_URL;
  const session = sessionAdmin();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    axios
      .post(`${host}admin-page/log-out`, null, {
        headers: {
          Authorization: session.session,
        },
      })
      .then((response) => {
        if (response.data.success) {
          localStorage.removeItem("sessionAdmin");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <IconButton
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar />
      </IconButton>
      {!session ? (
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>
            <Button>Login</Button>
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>Name : {session.user}</MenuItem>
          <MenuItem onClick={handleClose}>Role : {session.role}</MenuItem>
          <MenuItem onClick={handleClose} sx={{ justifyContent: "center" }}>
            <Button onClick={handleLogout}>Logout</Button>
          </MenuItem>
        </Menu>
      )}
    </div>
  );
}
