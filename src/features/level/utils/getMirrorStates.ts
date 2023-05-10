import { Degree, Vector2D, LevelState } from "@features/stage";
interface mirrorState {
    pos: Vector2D;
    deg: Degree;
}
export const getMirrorStates = (levelState: LevelState): {
    reflectors: mirrorState[];
    lenses: mirrorState[];
} => {
    return {
        reflectors: levelState.reflectors.map(mirror => ({pos: mirror.pos, deg: mirror.deg})),
        lenses: levelState.lens.map(mirror => ({pos: mirror.pos, deg: mirror.deg}))
    };
}