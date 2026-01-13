import React from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "../../../styles/ckeditor-custom.css";
import { Link } from "react-router-dom";

const ProgramEditComponent = ({
  submitHandler,
  data,
  setData,
  fileUploadHandler,
  programFiles,
  deleteHandler,
  newfileList,
  cancelHandler,
}) => {
  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-8">
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-800">
        <h1 className="text-3xl mt-8 font-bold">
          {data.programName}프로그램 수정
        </h1>
        <div className="flex flex-col items-end text-sm text-gray-500 space-y-3">
          <span>작성자 : 관리자</span>
          <div className="flex gap-x-4">
            <button
              type="submit"
              onClick={submitHandler}
              className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-800 transition-colors"
            >
              수정
            </button>
            <button
              onClick={cancelHandler}
              className="bg-gray-600 text-white font-bold py-2 px-6 rounded hover:bg-gray-800 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <CKEditor
          key={data.pno}
          editor={ClassicEditor}
          data={data?.content ?? ""}
          onChange={(event, editor) => {
            const editorData = editor.getData();
            setData({ ...data, content: editorData });
          }}
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-800 mb-2">
          이미지 추가
          <div className="text-sm text-gray-500">
            업로드한 이미지는 글 가장 아래에 적용됩니다.
          </div>
        </label>

        <label htmlFor="files">
          <div className="flex items-center justify-center px-6 py-8 border-2 border-gray-300 border-dashed rounded-xl bg-gray-50 hover:bg-gray-200 transition-all cursor-pointer">
            <input
              id="files"
              type="file"
              onChange={fileUploadHandler}
              ref={programFiles}
              accept=".gif, .jpg, .png"
              multiple
              hidden
            />
            <div className="text-center text-gray-500 cursor-pointer">
              <div className="text-5xl font-bold text-gray-400 leading-none mb-3">
                +
              </div>
              <p className="font-medium">이미지를 추가하려면 클릭하세요</p>
              <p className="text-sm text-gray-400">(JPG · PNG · GIF 지원)</p>
            </div>
          </div>
        </label>
      </div>

      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          새로 추가한 이미지
        </h3>
        {newfileList && (
          <div className="mt-3 space-y-1">
            {newfileList.map((i, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-sm text-gray-700
                px-3 py-2 bg-gray-50 rounded-lg border border-gray-200
                hover:bg-gray-100 transition"
              >
                <span className="font-semibold text-blue-700">{idx + 1}.</span>
                <span className="truncate">{i.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <br />

      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          기존 업로드된 이미지
        </h3>
        {data.uploadFiles && (
          <div className="mt-3 space-y-1">
            {data.uploadFiles.map((i, idx) => (
              <div
                key={i.pno}
                className="flex items-center gap-3 text-sm text-gray-700
                px-3 py-2 bg-gray-50 rounded-lg border border-gray-200
                hover:bg-gray-100 transition"
              >
                <span className="font-semibold text-blue-700">{idx + 1}.</span>
                <span className="truncate">{i.fileName}</span>
                <button
                  name={i.fileNo}
                  onClick={(e) => deleteHandler(e)}
                  className="ml-auto text-red-500 text-xs px-2 py-1 border border-red-300 rounded hover:bg-red-100"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramEditComponent;
