export interface IResponse {
    count: number;
    next?: null;
    previous?: null;
    results?: (IResultsEntity)[] | null;
}

export interface IResultsEntity {
    name: string;
    url: string;
}

export interface IPokemonsInput {
    id: number;
    name: string | undefined;
}