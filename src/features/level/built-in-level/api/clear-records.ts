import { Difficulty, BuiltInLevelClearRecordsInterface } from "@features/level";
import { AxiosInstance } from "axios";


export const getClearRecords = async (axiosPrivate: AxiosInstance) => {
    const {data} = await axiosPrivate.get<BuiltInLevelClearRecordsInterface>('/levels/built-in');
    return data;
}

export const updateClearRecords = async (axiosPrivate:AxiosInstance, difficulty: Difficulty, idx: number) => {
    const {data} = await axiosPrivate.put<BuiltInLevelClearRecordsInterface>(`/levels/built-in?difficulty=${difficulty}&idx=${idx}`);
    return data;
}