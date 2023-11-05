import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
        zIndex: "9999",
      }}
    >
      <Typography color="red" fontSize={40} fontWeight={600}>
        Page Not Found
      </Typography>
      <Button fontWeight={500} fontSize={30} onClick={() => navigate("/login")}>
        Back
      </Button>
    </Box>
  );
};

export default NotFound;
