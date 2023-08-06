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

  const onClick = () => {
    if(idx < instructions.length - 1){
      setIdx(prev => prev + 1)
    }else{
      setOpen(false);
    }
  }
  useEffect(()=>{
    open ? setIdx(0) : onDialogFinish();
  }, [open])
  return (
    <Dialog 
      open={open}
      onClose={onClick}
      PaperProps={{
        elevation: 0,
        sx: {
          height: 200,
          alignSelf: "flex-start",
          backgroundColor: "#09092a",
          border: "solid #7B68EE 2px",
          userSelect: "none"
        },
        onClick
      }}
    >
      <DialogContent>
        <Typography>
          {idx < instructions.length ? instructions[idx] : ""}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

export default InstructionModal;