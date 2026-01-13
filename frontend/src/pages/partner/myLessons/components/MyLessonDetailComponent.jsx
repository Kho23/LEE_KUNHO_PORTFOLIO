import React from "react";

const MyLessonDetailComponent = ({ modalOpen, closeModal, getOneData }) => {
  console.log("getOneData", getOneData);
  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl p-0">
            <div
              className="
                sticky top-0 
                bg-white 
                px-6 py-4 
                rounded-t-xl
                shadow-sm
                z-10
              "
            >
              <h2
                className="
                  text-2xl font-bold text-gray-900 tracking-tight 
                  px-5 py-3
                  bg-gray-50
                  border border-gray-400
                  rounded-xl
                  shadow-sm
                  flex items-center gap-3
                "
              >
                {getOneData.title}
              </h2>
              <div className="max-h-[70vh] overflow-y-auto p-6 space-y-6">
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                  <span className="font-semibold text-gray-900 mr-1 text-lg block border-l-4 pl-2 border-blue-900">
                    준비물
                  </span>
                  {getOneData.tools}
                </p>

                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                  <span className="font-semibold text-gray-900 mr-1 text-lg block border-l-4 pl-2 border-blue-900">
                    설명
                  </span>
                  {getOneData.description}
                </p>

                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                  <span className="font-semibold text-gray-900 mr-1 text-lg block border-l-4 pl-2 border-blue-900">
                    커리큘럼
                  </span>
                  {getOneData.curriculum}
                </p>

                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                  <span className="font-semibold text-gray-900 mr-1 text-lg block border-l-4 pl-2 border-blue-900">
                    메모
                  </span>
                  {getOneData.memo}
                </p>
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50 rounded-b-xl">
              <button
                onClick={closeModal}
                className="
                  w-full py-2.5 rounded-lg font-semibold
                  bg-blue-900 text-white
                  hover:bg-blue-950 
                  transition shadow-sm
                "
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyLessonDetailComponent;
