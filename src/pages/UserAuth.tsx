import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemButton,
  TextField,
  ListItemText,
} from "@mui/material";

export default function UserAuth() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        handleClose();
      } else {
        setError("Registration failed, please try again.");
      }
    } catch (error) {
      setError("Registration failed, please try again.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        handleClose();
      } else {
        setError("Login failed, please try again.");
      }
    } catch (error) {
      setError("Login failed, please try again.");
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <ListItemButton onClick={handleClickOpen}>
        <ListItemText primary="Login/Register" />
      </ListItemButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login/Register</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your username and password to login or register.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <DialogContentText color="error">{error}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={handleRegister}>Register</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
