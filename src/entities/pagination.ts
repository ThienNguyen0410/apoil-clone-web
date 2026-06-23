export default interface Pagination {
    totalCount: number;
    pageSize: number;
    current: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

