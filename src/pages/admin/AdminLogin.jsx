import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { bgGradient } from "../../constants/color";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { adminLogin, getAdmin } from "../../redux/thunks/admin";


// const isAdmin = true

const AdminLogin = () => {

const {isAdmin} = useSelector(state => state.auth)
const dispatch = useDispatch()

  const secretKey = useInputValidation("");

  

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    dispatch(adminLogin(secretKey.value))
  };


  useEffect(() => {
    dispatch(getAdmin())
  }, [dispatch])

  if (isAdmin) return <Navigate to="/admin/dashboard" />

  return (
    <div
      style={{
        backgroundImage: bgGradient,
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Admin Login</Typography>
          <form
            style={{ width: "100%", marginTop: "1rem" }}
            onSubmit={submitHandler}
          >
            <TextField
              required
              fullWidth
              label="Secret Key"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />
            <Button
              sx={{ marginTop: "1rem" }}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
