import type { IOptions, IResponse } from "types";

export const getLastItem = (array: Array<any>) => array.slice(-1);


export const prepareOptions = (data: IResponse): IOptions[] =>
    data?.results?.map((r: any, idx: number) => ({
        id: idx + 1,
        value: idx + 1,
        label: r.name,
    })) || [];

export const prepareDate = (data: string[]): IOptions[] =>
    data.map((d: string, idx: number) => ({
        id: idx + 1,
        value: idx + 1,
        label: d,
    }));