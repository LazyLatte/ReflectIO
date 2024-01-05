import { LevelState } from "@features/stage";
import { MirrorStates } from "@features/level";
export const getMirrorStates = (levelState: LevelState): MirrorStates => {
    return {
        reflectors: levelState.reflectors.map(r => ({pos: r.pos, deg: r.deg, color: r.color})),
        lenses: levelState.lenses.map(l => ({pos: l.pos, deg: l.deg, color: l.color}))
    };
}