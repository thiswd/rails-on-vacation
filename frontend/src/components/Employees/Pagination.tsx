interface PaginationProps {
  currentPage: number
  setCurrentPage: (page: number) => void
  pagesAmount: number
}

export function Pagination({
  currentPage,
  setCurrentPage,
  pagesAmount,
}: PaginationProps) {
  const previousPage = () => {
    if (currentPage <= 1) return
    setCurrentPage(currentPage - 1)
  }

  const nextPage = () => {
    if (currentPage >= pagesAmount) return
    setCurrentPage(currentPage + 1)
  }

  return (
    <nav className="w-full flex items-center justify-center">
      <ul className="mx-auto inline-flex -space-x-px text-sm h-8">
        <li>
          <button
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300"
            id="prev"
            onClick={previousPage}
          >
            Anterior
          </button>
        </li>
        <li>
          <button
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300"
            id="next"
            onClick={nextPage}
          >
            Próxima
          </button>
        </li>
      </ul>
    </nav>
  )
}
