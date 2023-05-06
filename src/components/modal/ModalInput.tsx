import * as React from 'react'
import TextField from '@mui/material/TextField';
const ModalInput = ({type, id, placeholder, value, onChange, autoFocus=false, required=false, errMsg}) => {
  return (
    <TextField 
      type={type}
      id={id}
      autoComplete='off'
      placeholder={placeholder}
      variant="outlined"
      value={value}
      onChange={onChange}
      error={errMsg !== ''}
      required={required}
      autoFocus={autoFocus}

      size='medium'
      sx={{
        '& input': {
          padding: '10px',
          fontFamily: "Franklin Gothic Medium",
          fontWeight: 'bold',
          fontSize: '20px',
          letterSpacing: '2px',
          color: '#222222',
          "&::placeholder": {
            fontSize: '20px',
            letterSpacing: '2px',
            color: "#222222",
          },
        },
        fieldset: {
          borderColor: `${errMsg?'red':'#222222'} !important` 
        }
      }}
    />
  )

}

export default ModalInput;