import { Vector2D} from "@features/stage";
export interface TutorialGoal {
    match: "pos" | "deg";
    idx: number;
    pos: Vector2D;
    deg: number;
    
}

