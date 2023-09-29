type UsePaginationProps = {
    limit: number;
    total: number;
    setCurrentPage: (page: number) => void;
    currentPage: number;
};

export const usePagination = ({
    limit,
    total,
    setCurrentPage,
    currentPage,
}: UsePaginationProps) => {
    const firstPage = 1;
    const lastPage = Math.ceil(total / limit);
    const visiblePaginationNumbers = 3;
    const inRangePages = Math.floor(visiblePaginationNumbers / 2);
    const hasOffsetLeft = firstPage < currentPage - inRangePages - 1;
    const hasOffsetRight = lastPage > currentPage + inRangePages + 1;

    const firstVisiblePage = Math.max(firstPage, currentPage - inRangePages);
    const lastVisiblePage = Math.min(
        lastPage,
        firstVisiblePage + visiblePaginationNumbers - 1
    );

    const arrayFromFirstToLastVisiblePage = Array.from(
        { length: lastVisiblePage - firstVisiblePage + 1 },
        (_, i) => firstVisiblePage + i
    );

    const handleChangePage = (page: number) => {
        if (page < firstPage || page > lastPage) return;

        setCurrentPage(page);
    };

    return {
        firstPage,
        lastPage,
        firstVisiblePage,
        lastVisiblePage,
        arrayFromFirstToLastVisiblePage,
        hasOffsetLeft,
        hasOffsetRight,
        handleChangePage,
    };
};
