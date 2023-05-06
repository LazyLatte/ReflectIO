import {FC, Dispatch, SetStateAction} from 'react';
import {useState, createContext} from 'react';
export interface Auth {
  name: string;
  accessToken: string | null;
}
interface AuthContextInterface {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
}
const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider: FC<Provider> = ({children}) => {
  const [auth, setAuth] = useState<Auth>({name: '', accessToken: null});
  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;