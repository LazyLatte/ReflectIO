import {useState, MouseEvent, useEffect, FC, Dispatch, SetStateAction} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {ModalBox, ModalInput, ModalButton, Separator} from '@features/ui';
import { useAuth, userRegister } from '@features/authentication';
import { isAxiosError } from 'axios';
interface RegisterProps {
  username: string;
  closeModal: () => void;
  setPage: Dispatch<SetStateAction<string>>;
}
const PWD_REGEX = /^[a-zA-Z0-9]{8,24}$/;
const Register: FC<RegisterProps> = ({username, closeModal, setPage}) => {
  const {setAuth} = useAuth()!;

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
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    try{
      const {name, accessToken} = await userRegister(username, pwd);
      console.log({name, accessToken});
      setAuth({name, accessToken});
      closeModal();
    }catch(err){
      if(isAxiosError(err)){
        if(err.response){
          switch(err.response.status){
            case 400:
              setErrMsg2('Name and password are required!');
              break;
            case 409:
              setErrMsg2(`Username ${username} have already been taken`)
              break;
            case 500:
              setErrMsg2('server error');
              break;
            default:
              console.error(err)
              break;
          }
        }else{
          setErrMsg2('No Server Response');
          console.log(err.config);
        }
      }else{
        console.error(err);
      }
    }
  }
  
  return (
      <ModalBox height={300} width={700}>
        <Typography  variant='caption'>{`USERNAME ${username} IS AVAILABLE`}</Typography>
        <Separator/>
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
          autoFocus={false}
          required={true}
        />
        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width='100%' >
          <ModalButton width='25%' disabled={false} onClick={()=>setPage('username')}>BACK</ModalButton>
          <ModalButton width='70%' disabled={!validPwd || !validMatch} onClick={handleSubmit}>CREATE ACCOUNT</ModalButton>
        </Box>

      </ModalBox>
  )
}
export default Register;