import { useState } from "react"

export const usePagination = (total: number, itemsPerPage = 18) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(total / itemsPerPage);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const next = () => setPage((p) => Math.min(p + 1, totalPages));
  const prev = () => setPage((p) => Math.max(p - 1, 1));

  return { page, start, end, totalPages, next, prev };
};