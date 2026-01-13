import React from "react";

const SupportWriteComponent = ({
  changeHandler,
  supportFiles,
  fileHandler,
  cancelHandler,
  submitHandler,
  support,
  files,
}) => {
  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
      <h1 className="text-3xl font-extrabold text-gray-800 border-b-2 pb-4 mb-8 text-center">
        1:1 문의 작성
      </h1>

      <div className="space-y-6">
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">
            제목
          </label>
          <input
            name="title"
            type="text"
            value={support.title}
            onChange={changeHandler}
            placeholder="제목을 입력해 주세요."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-950 focus:border-blue-950 transition duration-150 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">
            내용
          </label>
          <textarea
            name="content"
            rows="6"
            value={support.content}
            onChange={changeHandler}
            placeholder="문의하실 내용을 입력해 주세요."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-950 focus:border-blue-950 transition duration-150 shadow-sm resize-y"
          ></textarea>
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">
            첨부 자료
          </label>
          <input
            name="files"
            type="file"
            ref={supportFiles}
            onChange={fileHandler}
            accept=".pdf, .jpg, .png"
            multiple
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-950 hover:file:bg-blue-100 cursor-pointer"
          />
          <p className="mt-2 text-sm text-gray-500">
            참고 자료 (스크린샷, 관련 문서 등)를 첨부해 주세요. (최대 5개 파일)
          </p>
          <div>
            {files && (
              <div className="mt-3 space-y-1">
                {files.map((i, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-sm text-gray-700"
                  >
                    <span className="font-semibold">{idx + 1}.</span>
                    <span>{i}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-10">
        <button
          className="px-6 py-3 rounded-xl font-bold text-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200 shadow-md"
          onClick={cancelHandler}
        >
          취소
        </button>
        <button
          className="px-6 py-3 rounded-xl font-bold text-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl"
          onClick={submitHandler}
        >
          제출
        </button>
      </div>
    </div>
  );
};

export default SupportWriteComponent;
