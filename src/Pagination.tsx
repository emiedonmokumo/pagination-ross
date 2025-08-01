interface PaginationProps {
  readonly title: string;
}

function Pagination({ title }: PaginationProps) {
  return <div>Pagination: {title}</div>;
}

export default Pagination;
