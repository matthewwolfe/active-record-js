export interface PaginateObject
{
    count: number;
    page: number;
    lastPage: number;
    data: any
}

export interface PaginationOptions
{
    limit: number;
    query: any;
    page: number;
}

export class Pagination
{
    public limit: number;
    public query: any;
    public page: number;

    public constructor({limit, query, page}: PaginationOptions)
    {
        this.limit = limit;
        this.query = query;
        this.page = page;
    }

    public async paginate(): Promise<PaginateObject>
    {
        const data = await this.query.limit(this.limit).offset((this.page - 1) * this.limit).get();
        const count = await this.query.count();

        return {
            count: count,
            data: data,
            page: this.page,
            lastPage: Math.ceil(count / this.limit)
        };
    }
}
