import { LevelState } from "@features/stage";
import { LevelInfo } from "@features/level";
export const state2info = (levelState: LevelState): LevelInfo => {
    return {
        height: levelState.height,
        width: levelState.width,
        lasers: levelState.lasers,
        targets: levelState.targets.map(e => ({pos: e.pos, color: e.color})),
        reflectors: levelState.reflectors.map(r => r.color),
        lenses: levelState.lenses.map(l => l.color)
    }
}