import { Vector2D, ObjectType} from "@features/stage";
export interface TutorialGoal {
    match: "pos" | "deg";
    type: ObjectType.Reflector | ObjectType.Lens;
    fromPos: Vector2D;
    toPos: Vector2D;
    toDeg: number;
}

