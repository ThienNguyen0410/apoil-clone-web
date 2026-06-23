export default interface Pagination {
    current_page: number;
    has_next_page: boolean;
    items: { count: number; total: number; per_page: number }
}

