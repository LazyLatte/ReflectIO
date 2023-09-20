import {FC} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom';
import { UserLevelInfo } from '../../..';
const styles = {
    editButton: {
        height: '50px',
        width: '150px',
        border: '2px solid',
        color: 'enter.main',
        fontSize: '2rem',
        '& .MuiButton-endIcon svg': {
        fontSize: '30px'
        }
    },
    deleteButton: {
        height: '50px',
        width: '50px',
        minWidth: '50px',
        border: '2px solid',
        color: 'purple',
    }
}
interface EditAndDeleteButtonsProps {userLevelInfo: UserLevelInfo, onDelete: () => void}
const EditAndDeleteButtons: FC<EditAndDeleteButtonsProps> = ({userLevelInfo, onDelete}) => {
  return (
    <Box display='flex' flexDirection='row' justifyContent='space-around' alignItems='center' width='90%'>
        <Button variant="contained" endIcon={<EditIcon/>} sx={styles.editButton} component={Link} to='/custom' state={{userLevelInfo}}>Edit</Button>
        <Button variant="contained" sx={styles.deleteButton} onClick={onDelete}><DeleteForeverIcon/></Button>
    </Box>
  )
}

export default EditAndDeleteButtons