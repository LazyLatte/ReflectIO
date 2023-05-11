import {useState, useEffect, FC, Dispatch, SetStateAction, MouseEvent} from 'react';
import {ModalBox, ModalInput, ModalButton, Separator} from '@features/ui';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useAuth, userLogin} from '@features/authentication';
import { isAxiosError } from 'axios';
interface LoginProps {
  username: string;
  closeModal: () => void;
  setPage: Dispatch<SetStateAction<string>>;
  onLogin: () => void;
}
const PWD_REGEX = /^[a-zA-Z0-9]{8,24}$/;
const Login: FC<LoginProps> = ({username, closeModal, setPage, onLogin}) => {
  const {setAuth} = useAuth()!;
  const [pwd, setPwd] = useState<string>('');
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('');
  
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd])
  
  useEffect(() => {
    (validPwd || pwd === '') ? setErrMsg('') : setErrMsg('Invalid password format');
  }, [pwd, validPwd]);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    try{
      const {name, accessToken} = await userLogin(username, pwd);
      console.log({name, accessToken});
      setAuth({name, accessToken});
      onLogin();
      closeModal();
    }catch(err){
      if(isAxiosError(err)){
        if(err.response){
          switch(err.response.status){
            case 400:
              setErrMsg('Name and password are required!');
              break;
            case 401:
              setErrMsg('Wrong username or password')
              break;
            default:
              console.error(err)
              break;
          }
        }else{
          setErrMsg('No Server Response');
          console.log(err.config);
        }
      }else{
        console.error(err);
      }
    }
  }

  return (
      <ModalBox height={300} width={700}>
        <Typography  variant='caption'>{`WELCOME BACK ${username}`}</Typography>
        <Separator/>
        <Typography variant='h6' sx={{marginBottom: '10px'}}>PLEASE ENTER YOUR PASSWORD TO LOGIN.</Typography>
        <ModalInput
          type="password"
          id="password"
          placeholder='PASSWORD'
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          errMsg={errMsg}
          autoFocus={true}
          required={true}
        />
        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%' >
          <ModalButton width='32%' disabled={false} onClick={()=>setPage('username')} >BACK</ModalButton>
          <ModalButton width='32%' disabled={false} onClick={()=>{}} >FORGOT</ModalButton>
          <ModalButton width='32%' disabled={!validPwd} onClick={handleSubmit} >LOGIN</ModalButton>
        </Box>
      </ModalBox>
  )
}

export default Login;
