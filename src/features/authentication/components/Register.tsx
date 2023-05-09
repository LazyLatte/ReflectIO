import * as React from 'react';
import {useState, useRef, useEffect, useContext, FC} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ModalFrame from '../../ui/box/ModalBox';
import ModalInput from '../../modal/ModalInput';
import ModalButton from '../../ui/button/ModalButton';
import SerparationLine from '../../ui/separator/SerparationLine';
import useAuth from '../../../hooks/useAuth';
import {userRegister} from '../../../api/user';

const PWD_REGEX = /^[a-zA-Z0-9]{8,24}$/;
const Register = ({username, closeModal, setPage}) => {
  const {setAuth} = useAuth();

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg1, setErrMsg1] = useState('');
  const [errMsg2, setErrMsg2] = useState('');

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
    (validPwd || pwd === '') ? setErrMsg1('') : setErrMsg1('Invalid password format');
  }, [pwd, validPwd]);
  useEffect(() => {
    (validMatch || matchPwd === '') ? setErrMsg2('') : setErrMsg2('Password is not matched');
  }, [matchPwd, validMatch]);
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const {name, accessToken} = await userRegister(username, pwd);
      console.log({name, accessToken});
      setAuth(prev => ({name, accessToken, refresh: !prev?.refresh}));
      closeModal();
    }catch(err){
      if(!err?.response) {
        setErrMsg2('No Server Response');
      }else if (err.response?.status === 400) {
        setErrMsg2('Name and password are required!');
      }else if (err.response?.status === 409){
        setErrMsg2(`Username ${username} have already been taken`)
      }else if (err.response?.status === 500){
        setErrMsg2('server error');
      }else{
        setErrMsg2('Unkown error');
      }
    }
  }
  
  return (
      <ModalFrame height={300} width={700}>
        <Typography  variant='caption'>{`USERNAME ${username} IS AVAILABLE`}</Typography>
        <SerparationLine/>
        <ModalInput
          type="password"
          id="password"
          placeholder='PASSWORD'
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          errMsg={errMsg1}
          required
          autoFocus
        />
        <ModalInput
          type="password"
          id="confirm_pwd"
          placeholder='CONFIRM PASSWORD'
          value={matchPwd}
          onChange={(e) => setMatchPwd(e.target.value)}
          errMsg={errMsg2}
          required
        />
        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%' >
          <ModalButton width='25%' onClick={()=>setPage('username')}>BACK</ModalButton>
          <ModalButton width='70%' disabled={!validPwd || !validMatch} onClick={handleSubmit}>CREATE ACCOUNT</ModalButton>
        </Box>

      </ModalFrame>
  )
}
export default Register;