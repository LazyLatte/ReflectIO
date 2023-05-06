import * as React from 'react';
import {FC, ReactNode} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";

const styles = {
  btn: {
    display:'flex',
    flexDirection: 'column',
    justifyContent:'flex-start',
    height: 150,
    width: 150,
    border: '2px solid white',
    borderLeft: 0,
    borderRadius: '0 3px 3px 0',
    color: 'white',
    '&:hover': {
      border: '2px solid',
      borderLeft: 0,
      backgroundColor: '#181f31'
    }
  }
}

const SearchButton = ({}) => {
  return (
        <Button variant="outlined" color='primary' sx={{...styles.btn}} component={Link} to='/search'>
          <SearchIcon sx={{fontSize: 100}}/>
          <Typography variant="h4" >
            Search
          </Typography>
        </Button>
  );
}

export default SearchButton;

