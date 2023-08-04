import { Vector2D, ObjectType } from "@features/stage";
export interface TutorialGoal {
    match: "pos" | "deg";
    type: ObjectType.Reflector | ObjectType.Lens;
    idx: number;
    pos: Vector2D;
    deg: number;
    
}

