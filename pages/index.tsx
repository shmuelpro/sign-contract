import * as React from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Container, Typography,FormControl,InputLabel,Input ,FormHelperText,AppBar,Toolbar,IconButton} from '@mui/material';
import {Menu} from '@mui/icons-material';


const Home: NextPage = () => {
  return (
    <Container >
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <FormControl>
            <InputLabel style={{right:0}}  htmlFor="my-input">המוכר</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">Well never share your email.</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel style={{right:0}} htmlFor="my-input">הקונה</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">Well never share your email.</FormHelperText>
          </FormControl>
        </Typography>

      </Box>
    </Container>
  )
}

export default Home
