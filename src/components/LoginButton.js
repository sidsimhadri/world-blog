import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Fab from '@mui/material/Fab';
import { useTheme } from "@mui/material/styles"; 

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    const theme = useTheme();
    
const buttonStyle = {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "15px",
    right: "10px", 
    width: "100px",
    height: "35px",
    borderRadius: "10px",
}


 if (!isAuthenticated) {
    return (
        <Fab style={buttonStyle} onClick={() => loginWithRedirect()} variant="extended">
        Login
      </Fab>
    );
  }


  return (
    <Fab style={buttonStyle}  onClick={() => logout()} variant="extended">
      Logout
    </Fab>
  );
};

export default LoginButton;