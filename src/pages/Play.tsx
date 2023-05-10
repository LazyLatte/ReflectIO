import {FC} from 'react';
import {BuiltInLevel, CustomLevel, PublicLevel } from '@features/level';
import { Mode } from '@features/stage';
import useAxiosPrivate from '@features/authentication/hooks/useAxiosPrivate';
interface PlayProps {
    mode: Mode;
};

const Play: FC<PlayProps> = ({mode}) => {
    const axiosPrivate = useAxiosPrivate();
    switch(mode){
        case Mode.BuiltIn: return <BuiltInLevel/>;
        case Mode.Custom: return <CustomLevel axiosPrivate={axiosPrivate}/>;
        case Mode.Public: return <PublicLevel axiosPrivate={axiosPrivate}/>;
    }
}

export default Play;

