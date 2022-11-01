import { IPageable } from "./pageable.model";

export interface IBaseResponse<T> {
    success?: boolean;
    code?: number | string;
    data?: T;
    message?: string;
    page?: IPageable;
    timestamp?: string | number | any;
}