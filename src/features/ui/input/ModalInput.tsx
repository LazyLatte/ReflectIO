import { FC, ChangeEventHandler, HTMLInputTypeAttribute} from 'react';
import TextField from '@mui/material/TextField';

interface ModalInputProps {
  type: HTMLInputTypeAttribute;
  id: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  autoFocus: boolean;
  required: boolean;
  errMsg: string;
}
export const ModalInput: FC<ModalInputProps> = ({type, id, placeholder, value, onChange, autoFocus, required, errMsg}) => {
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
