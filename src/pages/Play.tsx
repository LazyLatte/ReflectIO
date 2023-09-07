import {FC} from 'react';
import BuiltInLevel from '@features/level/built-in-level/BuiltInLevel';
import CustomLevel from '@features/level/custom-level';
import PublicLevel from '@features/level/public-level';
import TutorialLevel from '@features/level/tutorial-level';
import { Mode } from '@features/stage';
interface PlayProps {mode: Mode};

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

