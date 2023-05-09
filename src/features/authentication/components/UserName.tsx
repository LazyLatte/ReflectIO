import {useState, useEffect, FC, Dispatch, SetStateAction} from 'react';
import Typography from '@mui/material/Typography';
import { ModalBox, ModalButton, ModalInput, SerparationLine } from '@features/ui';
import useAuth from '../../../hooks/useAuth';
import {findUser} from '../../../api/user';

interface UserNameProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<string>>;
  closeModal: () => void;
}

const USER_REGEX = /^[A-z][A-z0-9-_]{2,14}$/;
const UserName: FC<UserNameProps> = ({username, setUsername, setPage, closeModal}) => {
  const {setAuth} = useAuth()!;
  const [validName, setValidName] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setValidName(USER_REGEX.test(username) || username==='');
  }, [username]);

  useEffect(() => {
    validName? setErrMsg('') : setErrMsg('Invalid username');
  }, [username, validName]);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(username === ''){
      const guest_name = "GUEST-" + Math.floor((Math.random()*10000)).toString();
      setAuth({name: guest_name, accessToken: null})
      setUsername(guest_name);
      setTimeout(closeModal, 500);
    }else{
      try{
        const userExisted = await findUser(username);
        setPage(userExisted?'login':'register');
        
      }catch(err){
        if(!err?.response) {
          setErrMsg('No Server Response');
        }else if (err.response?.status === 400) {
          setErrMsg('Name is required!');
        }else{
          setErrMsg('Unkown error');
        }
      }

    }
  }

  return (
      <ModalBox height={300} width={700}>
        <Typography variant='caption' >WELCOME TO REFLECT.IO</Typography>
        <SerparationLine/>
        <Typography variant='h6' sx={{marginBottom: '10px'}}>ENTER A USERNAME, OR LEAVE IT BLANK TO PLAY AS A GUEST.</Typography>
        <ModalInput
          type="text"
          id="username"
          placeholder='USERNAME'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus={true}
          required={false}
          errMsg={errMsg}
        />

        <ModalButton width='100%' disabled={!validName} onClick={handleSubmit}>JOIN</ModalButton>
      </ModalBox>
  )
}

export default UserName;

