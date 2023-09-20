import { useMutation } from "react-query";
import { useAxiosPrivate } from "@features/authentication";
import { MirrorState } from "@features/level";
interface PersonalBest {
    personal_best: number;
}
const useClearLevel = () => {
    const axiosPrivate = useAxiosPrivate();
    return useMutation(async ({id, mirrorStates}: {id: string, mirrorStates: {reflectors: MirrorState[], lenses: MirrorState[]}}) => {
        const {data} = await axiosPrivate.put<PersonalBest>(`/play/clear/${id}`, {mirrorStates});
        return data;
    })
}
export default useClearLevel;