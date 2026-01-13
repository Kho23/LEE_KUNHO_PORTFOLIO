import React from 'react'
import { useSearchParams } from 'react-router-dom';

const PageComponent = ({ pageData }) => {
    const [searchParam, setSearchParam] = useSearchParams();
    const movePage = (pageNum) => {
        console.log("👆 페이지 이동 클릭:", pageNum); // 클릭 확인용
        setSearchParam({
            page: pageNum,
            size: 10,
            type: searchParam.get("type") || "t",
            keyword: searchParam.get("keyword") || "",
            sort: searchParam.get("sort") || "LATEST",
            category: searchParam.get("category") || "",
            startTime: searchParam.get("startTime") || "",
            endTime: searchParam.get("endTime") || "",
            days: searchParam.getAll("days") || "",
            available: searchParam.get("available") === "true"
        });
    };
    return (
        <div>
            <div className="flex justify-center mt-8 gap-1">
                {pageData.prev && (
                    <button onClick={() => movePage(pageData.prevPage)} className="px-3 py-1 border rounded hover:bg-gray-200">
                        이전
                    </button>
                )}

                {pageData.pageNumList && pageData.pageNumList.map(pageNum => (
                    <button
                        key={pageNum}
                        className={`px-3 py-1 border rounded ${pageData.current === pageNum ? 'bg-gray-700 text-white' : 'hover:bg-gray-200'}`}
                        onClick={() => movePage(pageNum)}
                    >
                        {pageNum}
                    </button>
                ))}

                {pageData.next && (
                    <button onClick={() => movePage(pageData.nextPage)} className="px-3 py-1 border rounded hover:bg-gray-200">
                        다음
                    </button>
                )}
            </div>
        </div>
    )
}

export default PageComponent
