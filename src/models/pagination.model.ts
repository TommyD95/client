

export default class MetaData {
    public currentPage: number = 0;
    public totalPages: number = 0;
    public pageSize: number = 0;
    public totalCount: number = 0;

    public constructor(data: Partial<MetaData>) {
        Object.assign(this, data);
    }
}