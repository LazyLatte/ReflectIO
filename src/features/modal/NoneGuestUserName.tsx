import * as React from 'react';
import {useState, useEffect, useContext, FC} from 'react';
import ModalFrame from '../ui/box/ModalBox';
import ModalInput from './ModalInput';
import ModalButton from '../ui/button/ModalButton';
import SerparationLine from '../ui/separator/SerparationLine';
import Typography from '@mui/material/Typography';
import useAuth from '../../hooks/useAuth';
import {findUser} from '../../api/user';
const USER_REGEX = /^[A-z][A-z0-9-_]{2,14}$/;
const NoneGuestUserName = ({username, setUsername, setPage, isGuest}) => {
  const {auth, setAuth} = useAuth();

  const [validName, setValidName] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setValidName(USER_REGEX.test(username)  || username==='');
  }, [username]);

  useEffect(() => {
    validName? setErrMsg('') : setErrMsg('Invalid username');
  }, [username, validName]);

  const handleSubmit = async (e) =>{
    e.stopPropagation();
    e.preventDefault();
    if(username === ''){
      setErrMsg('Username cannot be empty!')
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
          setErrMsg('Unknown error');
        }
      }
    }
  }

  return (
    <ModalFrame height={300} width={700}>
        <Typography variant='caption'>{isGuest ? 'SIGN IN TO HAVE YOUR OWN LEVEL!' : 'TOKEN EXPIRED! PLEASE LOGIN AGAIN'}</Typography>
        <SerparationLine/>
        <ModalInput
          type="text"
          id="username"
          placeholder='USERNAME'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          required
          errMsg={errMsg}
        />
        <ModalButton width='100%' disabled={!validName} onClick={handleSubmit}>JOIN</ModalButton>
    </ModalFrame>
  )
}

export default NoneGuestUserName;