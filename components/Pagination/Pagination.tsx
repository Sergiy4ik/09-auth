import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selected: number) => void;
}

export default function Pagination({ pageCount, currentPage, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      breakLabel="..."
      pageRangeDisplayed={3}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={event => onPageChange(event.selected)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      disabledClassName={css.disabled}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
