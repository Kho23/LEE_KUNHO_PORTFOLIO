import React from "react";

const PageComponent = ({ serverData, movePage }) => {
  return (
    <div className="flex justify-center mt-8 gap-1 select-none">
      {/* Prev 버튼 */}
      {serverData.prev && (
        <button
          onClick={() => movePage({ page: serverData.prevPage })}
          className="px-3 py-1 border rounded hover:bg-gray-200"
        >
          Prev
        </button>
      )}

      {/* 페이지 번호 */}
      {serverData.pageNumList.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => movePage({ page: pageNum })}
          className={`px-3 py-1 border rounded ${
            serverData.current === pageNum
              ? "bg-gray-700 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          {pageNum}
        </button>
      ))}

      {/* Next 버튼 */}
      {serverData.next && (
        <button
          onClick={() => movePage({ page: serverData.nextPage })}
          className="px-3 py-1 border rounded hover:bg-gray-200"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default PageComponent;
