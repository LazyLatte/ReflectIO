import { Difficulty, BuiltInLevelClearRecordsInterface } from "@features/level";
import { AxiosInstance } from "axios";


export const getClearRecords = async (axiosPrivate: AxiosInstance) => {
    return await axiosPrivate.get<BuiltInLevelClearRecordsInterface>('/levels/built-in');
}

export const updateClearRecords = async (axiosPrivate:AxiosInstance, difficulty: Difficulty, idx: number) => {
    return  await axiosPrivate.put<BuiltInLevelClearRecordsInterface>(`/levels/built-in?difficulty=${difficulty}&idx=${idx}`);
}