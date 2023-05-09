import * as React from 'react';
import {useState, useRef, useEffect, useContext, FC} from 'react';
import ModalFrame from '../../ui/box/ModalBox';
import ModalInput from '../../modal/ModalInput';
import ModalButton from '../../ui/button/ModalButton';
import SerparationLine from '../../ui/separator/SerparationLine';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useAuth from '../../../hooks/useAuth';
import {userLogin} from '../../../api/user';

const PWD_REGEX = /^[a-zA-Z0-9]{8,24}$/;
const Login = ({username, closeModal, setPage}) => {
  const {setAuth} = useAuth();
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd])
  
  useEffect(() => {
    (validPwd || pwd === '') ? setErrMsg('') : setErrMsg('Invalid password format');
  }, [pwd, validPwd]);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const {name, accessToken} = await userLogin(username, pwd);
      console.log({name, accessToken});
      setAuth(prev => ({name, accessToken, refresh: !prev?.refresh}));
      closeModal();
    }catch(err){
      if(!err?.response) {
        setErrMsg('No Server Response');
      }else if (err.response?.status === 400) {
        setErrMsg('Name and password are required!');
      }else if (err.response?.status === 401){
        setErrMsg('Wrong username or password')
      }else{
        setErrMsg('Unkown error');
      }
    }
  }

  return (
      <ModalFrame height={300} width={700}>
        <Typography  variant='caption'>{`WELCOME BACK ${username}`}</Typography>
        <SerparationLine/>
        <Typography variant='h6' sx={{marginBottom: '10px'}}>PLEASE ENTER YOUR PASSWORD TO LOGIN.</Typography>
        <ModalInput
          type="password"
          id="password"
          placeholder='PASSWORD'
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          errMsg={errMsg}
          autoFocus
          required
        />
        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%' >
          <ModalButton width='32%' onClick={()=>setPage('username')} >BACK</ModalButton>
          <ModalButton width='32%' onClick={()=>{}} >FORGOT</ModalButton>
          <ModalButton width='32%' disabled={!validPwd} onClick={handleSubmit} >LOGIN</ModalButton>
        </Box>
      </ModalFrame>
  )
}

export default Login;
