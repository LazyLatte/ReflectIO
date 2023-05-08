import Button from '@mui/material/Button';
import ForwardIcon from '@mui/icons-material/Forward';

const styles = {
  btn: {
    display:'flex',
    flexDirection: 'column',
    justifyContent:'center',
    height: 100,
    width: 90,
    border: '2px solid white',
    borderBottom: 0,
    borderRadius: '3px 3px 0 0',
    color: 'white',
    '&:hover': {
      border: '2px solid',
      borderBottom: 0,
      backgroundColor: '#181f31'
    }
  }
}

const ScrollTopButton = ({}) => {
  const handleOnClick = () => {
    document.querySelector('.infinite-scroll-component')?.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }
  return (
        <Button variant="outlined" color='primary' sx={{...styles.btn}} onClick={handleOnClick}>
          <ForwardIcon sx={{fontSize: 80, transform: 'rotate(270deg)'}}/>
        </Button>
  );
}

export default ScrollTopButton;

