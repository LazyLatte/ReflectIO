import {FC, ElementType} from 'react';
import Button, {ButtonProps} from '@mui/material/Button';
import useColorMode from 'src/hooks/useColorMode';
interface IProps extends ButtonProps {
    component?: ElementType;
    to?: string;
    state?: any;
} 
const ToggledButton: FC<IProps> = (props) => {
    const {colorMode} = useColorMode()!;
    const variant = colorMode === 'dark' ? 'outlined' : 'contained';
    return (
        <Button variant={variant} {...props}>
            {props.children}
        </Button>
    );
}

export default ToggledButton;

