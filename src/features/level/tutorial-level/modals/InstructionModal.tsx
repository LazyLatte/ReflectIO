import {useState, FC, SetStateAction, Dispatch, useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';

interface InstructionModalProps {
  instructions: string[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onDialogFinish: () => void;
};
const InstructionModal: FC<InstructionModalProps> = ({instructions, open, setOpen, onDialogFinish}) => {
  const [idx , setIdx] = useState(0);
  const onClick = () => ((idx < instructions.length - 1) ? setIdx(prev => prev + 1) : setOpen(false));
  useEffect(()=>{
    open ? setIdx(0) : onDialogFinish();
  }, [open])
  const colorMixingRule = <p style={{margin: 0}}>The mixing rule follows the RGB color model<br/>
    <span style={{color: 'transparent', textShadow: '0 0 0 #ffff00'}}>⚪</span>&nbsp;= &nbsp; 
    <span style={{color: 'transparent', textShadow: '0 0 0 #ff0000'}}>⚪</span>&nbsp;+ &nbsp; 
    <span style={{color: 'transparent', textShadow: '0 0 0 #00ff00'}}>⚪</span>
    <br/>
    <span style={{color: 'transparent', textShadow: '0 0 0 #ff00ff'}}>⚪</span>&nbsp;= &nbsp; 
    <span style={{color: 'transparent', textShadow: '0 0 0 #ff0000'}}>⚪</span>&nbsp;+ &nbsp; 
    <span style={{color: 'transparent', textShadow: '0 0 0 #0000ff'}}>⚪</span>
    <br/>
    <span style={{color: 'transparent', textShadow: '0 0 0 #00ffff'}}>⚪</span>&nbsp;= &nbsp; 
    <span style={{color: 'transparent', textShadow: '0 0 0 #00ff00'}}>⚪</span>&nbsp;+ &nbsp; 
    <span style={{color: 'transparent', textShadow: '0 0 0 #0000ff'}}>⚪</span>
    <br/>
    <span style={{color: 'transparent', textShadow: '0 0 0 #ffffff'}}>⚪</span>&nbsp;= &nbsp; 
    <span style={{color: 'transparent', textShadow: '0 0 0 #ff0000'}}>⚪</span>&nbsp;+ &nbsp; 
    <span style={{color: 'transparent', textShadow: '0 0 0 #00ff00'}}>⚪</span>&nbsp;+ &nbsp; 
    <span style={{color: 'transparent', textShadow: '0 0 0 #0000ff'}}>⚪</span>
    <br/>
  </p>
  return (
    <Dialog 
      open={open}
      onClose={onClick}
      PaperProps={{
        elevation: 0,
        sx: {
          width: 600,
          height: 300,
          alignSelf: "flex-start",
          backgroundColor: "#09092a",
          border: "solid #7B68EE 2px",
          userSelect: "none"
        },
        onClick
      }}
    >
      <DialogContent>
        <Typography sx={{fontFamily: "Edu SA Beginner, cursive", fontSize: 32}}>
          {idx < instructions.length && (instructions[idx] === "#RULE#" ? colorMixingRule : instructions[idx])}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

export default InstructionModal;