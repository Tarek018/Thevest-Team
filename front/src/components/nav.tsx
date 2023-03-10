import { Component, createEffect, createSignal, Show } from 'solid-js';
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
  } from "@suid/material";
  import { useNavigate } from "solid-app-router";

const Nav: Component = () => {
  const [ss,setss]=createSignal(0);

  let navigate = useNavigate();

  createEffect(()=>{
    console.log(localStorage.getItem('user'));
    
    if(localStorage.length>0){
      setss(1)
    }
    
  })

    return (
        <Box >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6"  sx={{ flexGrow: 1 }}  >
            FbLite
          </Typography>
            <Button color="inherit" onClick={()=>{navigate('/signin');  
             }} >Create account</Button>
          <Button color="inherit" onClick={navigate('/account')} >View account</Button>
        </Toolbar>
      </AppBar>
    </Box>
    )
}

export default Nav;