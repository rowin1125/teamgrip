import { Button, Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { usePagination } from './hooks/usePagination';

type PaginationProps = {
  total?: number;
  limit: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
};

const Pagination = ({
  limit,
  total,
  setCurrentPage,
  currentPage,
}: PaginationProps) => {
  if (!total) return null;

  const {
    firstPage,
    lastPage,
    arrayFromFirstToLastVisiblePage,
    hasOffsetLeft,
    hasOffsetRight,
    handleChangePage,
  } = usePagination({
    limit,
    total,
    setCurrentPage,
    currentPage,
  });

  return (
    <Flex mt={8} justifyContent="center">
      <Button
        size="sm"
        mx={1}
        onClick={() => handleChangePage(currentPage - 1)}
        isDisabled={firstPage === currentPage}
      >
        <Icon as={BiChevronLeft} fontSize="2xl" />
      </Button>
      <Button
        size="sm"
        mx={1}
        onClick={() => handleChangePage(firstPage)}
        colorScheme={firstPage === currentPage ? 'secondary' : 'primary'}
      >
        {firstPage}
      </Button>
      {hasOffsetLeft && (
        <Button size="sm" mx={1} variant="ghost">
          ...
        </Button>
      )}
      {arrayFromFirstToLastVisiblePage.map((page) => {
        if (page === firstPage || page === lastPage) return null;
        return (
          <Button
            key={`page-${page}`}
            onClick={() => handleChangePage(page)}
            size="sm"
            mx={1}
            colorScheme={page === currentPage ? 'secondary' : 'primary'}
          >
            {page}
          </Button>
        );
      })}
      {hasOffsetRight && (
        <Button size="sm" mx={1} variant="ghost">
          ...
        </Button>
      )}

      <Button
        size="sm"
        mx={1}
        onClick={() => handleChangePage(lastPage)}
        colorScheme={lastPage === currentPage ? 'secondary' : 'primary'}
      >
        {lastPage}
      </Button>
      <Button
        size="sm"
        mx={1}
        isDisabled={lastPage === currentPage}
        onClick={() => handleChangePage(currentPage + 1)}
      >
        <Icon as={BiChevronRight} fontSize="2xl" />
      </Button>
    </Flex>
  );
};

export default Pagination;
