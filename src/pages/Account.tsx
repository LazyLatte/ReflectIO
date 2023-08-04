import {FC, useRef} from 'react';
import { motion } from "framer-motion";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAuth, ChangeUsernameModal, ChangeUsernameModalHandle } from '@features/authentication';
interface AccountProps {};
const Account: FC<AccountProps> = () => {
    const {auth} = useAuth()!;
    const changeUsernameModalRef = useRef<ChangeUsernameModalHandle>(null);
    return (
        <>
            <motion.div
                initial={{x: '100vw', opacity: 0}}
                animate={{ x: 0, opacity: 1}}
                exit={{ x: '100vw', opacity: 0 }}
                transition= { {duration: 0.8 }}
                style={{
                    position: 'absolute',
                    width: '100%',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingTop: 100,
                    fontSize: '2rem'

                }}
            >
                <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' width={800} height={70} border='solid 2px red'>
                    <Box display='flex' justifyContent='center' alignItems='center' flex={2} height='100%' border='solid 2px blue'>
                        Username
                    </Box>
                    <Box display='flex' justifyContent='flex-start' alignItems='center' flex={4} height='100%' border='solid 0px green' paddingLeft={3}>
                        {auth.name}
                    </Box>
                    <Box display='flex' justifyContent='center' alignItems='center' flex={2} height='100%' border='solid 0px cyan'>
                        <Button
                            variant='outlined'
                            sx={{
                                height: '50px',
                                width: '140px',
                                border: 'solid pink 2px',
                                borderRadius: 10,
                                color: 'pink',
                                transition: 'border 500ms ease',
                                '&:hover': {
                                    border: 'solid magenta 2px',
                                }
                            }}
                            onClick={() => {
                                changeUsernameModalRef.current?.open();
                            }}
                        >
                            Modify
                        </Button>
                    </Box>
                </Box>

                <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' width={800} height={70} border='solid 2px red' margin='40px 0'>
                    <Box display='flex' justifyContent='center' alignItems='center' flex={2} height='100%' border='solid 2px blue'>
                        Password
                    </Box>
                    <Box display='flex' justifyContent='flex-start' alignItems='center' flex={4} height='100%' border='solid 0px green' paddingLeft={3}/>
                    <Box display='flex' justifyContent='center' alignItems='center' flex={2} height='100%' border='solid 0px cyan'>
                        <Button
                            variant='outlined'
                            sx={{
                                height: '50px',
                                width: '140px',
                                border: 'solid pink 2px',
                                borderRadius: 10,
                                color: 'pink',
                                transition: 'border 500ms ease',
                                '&:hover': {
                                    border: 'solid magenta 2px',
                                }
                            }}
                            onClick={() => {
                                changeUsernameModalRef.current?.open();
                            }}
                        >
                            Modify
                        </Button>
                    </Box>
                </Box>
            </motion.div>
            <ChangeUsernameModal ref={changeUsernameModalRef}/>
        </>
    );
}

export default Account;