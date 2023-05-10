import { useQuery } from 'react-query';
import { BuiltInLevelClearRecordsInterface } from "@features/level";
import { useAxiosPrivate } from "@features/authentication";

export const useGetClears = () => {
    const axiosPrivate = useAxiosPrivate();
    return useQuery<BuiltInLevelClearRecordsInterface, Error>({
        queryKey: ["clears"], 
        queryFn: async () => {
            const {data} = await axiosPrivate.get<BuiltInLevelClearRecordsInterface>('/levels/built-in');
            console.log(data);
            return data
        },
        initialData: {
            easy: 0,
            normal: 0,
            hard: 0
        },
        retry: 1
    })
}

