import {
  FaAngleLeft,
  FaAnglesLeft,
  FaAngleRight,
  FaAnglesRight,
} from 'react-icons/fa6';

export const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const pagesToShow = 3; // Кількість сторінок, які потрібно показати

  // Логіка для генерації номери сторінок з '...'
  let pageNumbers = [];

  if (totalPages <= pagesToShow) {
    // Якщо сторінок менше або рівно 3, показуємо всі
    pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  } else {
    // Інакше - показуємо перші 2 сторінки, потім "..." і останню сторінку
    if (currentPage <= 2) {
      pageNumbers = [1, 2, 3, '...', totalPages];
    } else if (currentPage >= totalPages - 1) {
      pageNumbers = [totalPages - 2, totalPages - 1, totalPages];
    } else {
      pageNumbers = [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
      ];
    }
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      {/* Перша сторінка */}
      <button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
      >
        <FaAnglesLeft />
      </button>
      {/* Попередня сторінка */}
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
      >
        <FaAngleLeft />
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => page !== '...' && setCurrentPage(page)}
          className={`px-3 py-1 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
      >
        <FaAngleRight />
      </button>

      <button
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
      >
        <FaAnglesRight />
      </button>
    </div>
  );
};
