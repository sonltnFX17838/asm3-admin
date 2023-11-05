import {
  AppBar,
  ButtonGroup,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
// import logoLight from "../../Image/logo-light-text.png";
import logoIcon from "../../Image/logo-icon.png";
import logoText from "../../Image/logo-text.png";
import { useNavigate } from "react-router-dom";
import sessionAdmin from "../../utils/sessionAdmin";
import MenuLogout from "./MenuLogout";

const Header = () => {
  const navigate = useNavigate();
  const session = sessionAdmin();
  return (
    <AppBar color="inherit" position="static">
      <Toolbar>
        <Typography component="div">
          <img src={logoIcon} alt=""></img>
          <img src={logoText} alt="" className="h-8 pt-2"></img>
          <Typography component="div">
            <ButtonGroup>
              {session && session.role === "Admin" && (
                <>
                  <Button onClick={() => navigate("/admin/home")}>Home</Button>
                  <Button onClick={() => navigate("/admin/dash-board")}>
                    Dashboard
                  </Button>
                  <Button onClick={() => navigate("/admin/products")}>
                    Products
                  </Button>
                  <Button onClick={() => navigate("/admin/new-product")}>
                    New
                  </Button>
                </>
              )}
              {session && (
                <Button onClick={() => navigate("/chat")}>Chat</Button>
              )}
            </ButtonGroup>
          </Typography>
        </Typography>
        <Typography component="div" sx={{ marginRight: "20px" }}>
          <MenuLogout />
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
