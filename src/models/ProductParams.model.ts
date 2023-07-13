export interface ProductParams {
    orderBy: string;
    searchTerms: string;
    types?: string[];
    brands?: string[];
    pageNumber: number;
    pageSize: number;
}