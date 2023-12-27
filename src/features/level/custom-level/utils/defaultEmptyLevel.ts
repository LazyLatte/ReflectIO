import { UserLevelInfo } from "@features/level"
export const defaultEmptyLevel: UserLevelInfo = {
    id: '',
    height: 10 ,
    width: 10 ,
    lasers: [] ,
    targets: [] ,
    reflectors: [],
    lenses: [],
    clears: 0,
    likes: 0,
    record: 8,
    public: false,
    creator: '',
    timestamp: '',
    thumbnail: '',
    personal_best: null
}