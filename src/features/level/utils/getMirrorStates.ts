import { LevelState } from "@features/stage";
import { MirrorState } from "@features/level";
export const getMirrorStates = (levelState: LevelState): {
    reflectors: MirrorState[];
    lenses: MirrorState[];
} => {
    return {
        reflectors: levelState.reflectors.map(mirror => ({pos: mirror.pos, deg: mirror.deg})),
        lenses: levelState.lens.map(mirror => ({pos: mirror.pos, deg: mirror.deg}))
    };
}