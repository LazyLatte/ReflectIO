import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import MotionPage from './MotionPage';
const AboutUs = () => {
  return (
    <MotionPage transitionType='slide' style={{height: '100%', alignItems: 'center'}}>
      <Paper 
        sx={{
          width: '50%',
          maxWidth: 750,
          height: 120,
          padding: '10px 20px',
          backgroundColor: '#17123b',
          border: 'solid #7B68EE',
          fontSize: '24px',
          color: 'white',
          overflow: 'scroll'
        }}
      >
        Reflect.io is an online puzzle game with RGB color model. Player can challenge a variety of levels, or create one by yourself. 
      </Paper>
      <Box position="absolute" bottom="50px" display="flex" flexDirection="row" justifyContent="center" alignItems="center" fontSize='20px' color="#7f7fe6">
        Contributor :&nbsp;<a href='https://github.com/LazyLatte' target="_blank" style={{color: '#aaaaee'}}>LazyLatte {'(Kuan-Fu Chen)'}</a>
      </Box>
    </MotionPage>
  );
}

export default AboutUs;