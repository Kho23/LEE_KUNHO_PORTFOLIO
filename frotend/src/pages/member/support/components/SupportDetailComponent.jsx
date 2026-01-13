import SupportAnsweredComponent from "./SupportAnsweredComponent";

const SupportDetailComponent = ({ supportList, toListHandler }) => {
  return (
    <div className="container mx-auto max-w-4xl p-6 md:p-10">
      <div className="bg-white shadow-md rounded-xl p-8 mb-10 border border-gray-200">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 border-l-8 border-blue-700 pl-4">
            1:1 문의 상세
          </h1>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold
                  ${
                    supportList.status === "WAITING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }
                `}
          >
            {supportList.status === "WAITING" ? "답변 대기" : "답변 완료"}
          </span>
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-1 pb-1 border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-blue-700">문의 번호</span>
            <span>{supportList.supportNo}</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-semibold text-blue-700">등록일</span>
            <span>{supportList.createdDate?.slice(0, 10)}</span>
          </div>
        </div>

        <div>
          <span className="font-bold text-lg text-blue-700 mb-1">
            제목 &nbsp;
          </span>
          <span className="text-gray-800">{supportList.supportTitle}</span>
          <hr />
          <br />
        </div>

        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 leading-relaxed">
          <p className="font-bold text-lg mb-4 text-blue-700">문의 내용</p>
          <p className="whitespace-pre-wrap mb-6">
            {supportList.supportContent}
          </p>
          <p className="font-bold text-lg mb-3 text-blue-700"></p>
          {supportList.fileName?.length > 0 && (
            <img
              alt={supportList.fileName?.[0]}
              src={`/api/member/support/view/s_${supportList.savedName?.[0]}`}
              className="max-w-md w-full h-auto rounded-lg shadow"
            />
          )}
        </div>
      </div>

      <SupportAnsweredComponent supportList={supportList} />
      <div className="text-center mt-12">
        <button
          className="bg-blue-700 hover:bg-blue-900 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-md"
          onClick={toListHandler}
        >
          목록으로
        </button>
      </div>
    </div>
  );
};

export default SupportDetailComponent;
