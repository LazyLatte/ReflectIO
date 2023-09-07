import { LevelState } from "@features/stage";
import { MirrorStates } from "@features/level";
export const getMirrorStates = (levelState: LevelState): MirrorStates => {
    return {
        reflectors: levelState.reflectors.map(mirror => ({pos: mirror.pos, deg: mirror.deg})),
        lenses: levelState.lens.map(mirror => ({pos: mirror.pos, deg: mirror.deg}))
    };
}