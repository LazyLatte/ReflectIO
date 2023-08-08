import {useState, useEffect, FC, Dispatch, SetStateAction, MouseEvent} from 'react';
import { ModalBox, ModalButton, ModalInput, ModalSeparator} from '@features/ui/modal';
import Typography from '@mui/material/Typography';
import {findUser} from '@features/authentication';
import { isAxiosError } from 'axios';
interface NoneGuestUserNameProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<string>>;
  isGuest: boolean;
}
const USER_REGEX = /^[A-z][A-z0-9-_]{2,14}$/;
const NoneGuestUserName: FC<NoneGuestUserNameProps> = ({username, setUsername, setPage, isGuest}) => {

  const [validName, setValidName] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('');

  useEffect(() => {
    setValidName(USER_REGEX.test(username)  || username==='');
  }, [username]);

  useEffect(() => {
    validName? setErrMsg('') : setErrMsg('Invalid username');
  }, [username, validName]);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) =>{
    e.stopPropagation();
    e.preventDefault();
    if(username === ''){
      setErrMsg('Username cannot be empty!')
    }else{
      try{
        const userExisted = await findUser(username);
        setPage(userExisted?'login':'register');
      }catch(err){
        if(isAxiosError(err)){
          if(err.response){
            switch(err.response.status){
              case 400:
                setErrMsg('Name is required!');
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
  }

  return (
    <ModalBox height={300} width={700}>
        <Typography variant='caption'>{isGuest ? 'SIGN IN TO HAVE YOUR OWN LEVEL!' : 'TOKEN EXPIRED! PLEASE LOGIN AGAIN'}</Typography>
        <ModalSeparator/>
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
    </ModalBox>
  )
}

export default NoneGuestUserName;