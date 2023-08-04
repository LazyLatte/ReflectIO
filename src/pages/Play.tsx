import {FC} from 'react';
import {BuiltInLevel, CustomLevel, PublicLevel, TutorialLevel } from '@features/level';
import { Mode } from '@features/stage';
interface PlayProps {
    mode: Mode;
};

const Play: FC<PlayProps> = ({mode}) => {
    switch(mode){
        case Mode.BuiltIn: return <BuiltInLevel/>;
        case Mode.Custom: return <CustomLevel/>;
        case Mode.Public: return <PublicLevel/>;
        case Mode.Tutorial: return <TutorialLevel/>;
        default: return null;
    }
}

export default Play;

