import React from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "../../../styles/ckeditor-custom.css";

// 1. 불필요한 props(newfileList, programFiles) 제거
const ProgramEditComponent = ({
  submitHandler,
  data,
  setData,
  fileUploadHandler,
  deleteHandler,
  cancelHandler,
}) => {
  
  // 서버 이미지 경로 처리 (http 포함 여부 등에 따라 조정 필요, 여기선 예시)
  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("https")) return path;
    return `api/jeocenter.shop/${path}`; // 서버 도메인에 맞게 수정 필요
  };

  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-8">
      {/* 상단 헤더 및 버튼 영역 */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-800">
        <h1 className="text-3xl mt-8 font-bold">
          {data.programName} 프로그램 수정
        </h1>
        <div className="flex flex-col items-end text-sm text-gray-500 space-y-3">
          <span>작성자 : 관리자</span>
          <div className="flex gap-x-4">
            <button
              type="button" // type="button" 명시 권장
              onClick={submitHandler}
              className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-800 transition-colors"
            >
              수정 완료
            </button>
            <button
              type="button"
              onClick={cancelHandler}
              className="bg-gray-600 text-white font-bold py-2 px-6 rounded hover:bg-gray-800 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      </div>

      {/* 에디터 영역 */}
      <div className="mb-6">
        <CKEditor
          key={data.pno} // pno가 바뀌면 에디터 리셋
          editor={ClassicEditor}
          data={data?.content ?? ""}
          onChange={(event, editor) => {
            const editorData = editor.getData();
            setData((prev) => ({ ...prev, content: editorData }));
          }}
        />
      </div>

      {/* 파일 업로드 버튼 영역 */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-800 mb-2">
          이미지 관리
          <div className="text-sm text-gray-500 font-normal mt-1">
            이미지를 선택하면 즉시 업로드되며 목록에 추가됩니다.
          </div>
        </label>

        <label htmlFor="files">
          <div className="flex items-center justify-center px-6 py-8 border-2 border-gray-300 border-dashed rounded-xl bg-gray-50 hover:bg-gray-200 transition-all cursor-pointer">
            <input
              id="files"
              type="file"
              onChange={fileUploadHandler}
              // ref={programFiles}  <-- 제거함 (더 이상 필요 없음)
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

      {/* 2. 통합된 이미지 리스트 영역 (기존 + 신규 합쳐서 보여줌) */}
      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          첨부된 이미지 목록 ({data.uploadFiles ? data.uploadFiles.length : 0}개)
        </h3>

        {data.uploadFiles && data.uploadFiles.length > 0 ? (
          <div className="mt-3 space-y-2">
            {data.uploadFiles.map((file, idx) => {
              // 3. ID와 파일명, 이미지 경로 추출 (서버 DTO 구조에 따라 유연하게)
              // 기존 파일은 fileNo, 새 파일은 fno를 가질 수 있음
              const fileId = file.fileNo || file.fno; 
              const fileName = file.originalName || file.fileName || "이미지";
              // 썸네일 경로가 있으면 보여주고 없으면 아이콘 처리
              const thumbUrl = file.thumbnailPath || file.filePath || file.imageUrl; 

              return (
                <div
                  key={fileId || idx} // ID가 없으면 인덱스라도 사용
                  className="flex items-center gap-3 text-sm text-gray-700 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                >
                  <span className="font-semibold text-blue-700 min-w-[20px]">{idx + 1}.</span>
                  
                  {/* 4. 이미지 미리보기 (있으면 표시) */}
                  {thumbUrl && (
                     <img 
                       src={getImageUrl(thumbUrl)} 
                       alt="thumb" 
                       className="w-10 h-10 object-cover rounded border border-gray-300"
                     />
                  )}

                  <span className="truncate flex-1">{fileName}</span>
                  
                  <button
                    type="button"
                    // 5. 핵심 수정: 이벤트(e)가 아니라 ID를 바로 넘김!
                    onClick={() => deleteHandler(fileId)}
                    className="ml-auto text-red-500 text-xs px-3 py-1.5 border border-red-300 rounded hover:bg-red-50 font-medium transition-colors"
                  >
                    삭제
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">
            등록된 이미지가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgramEditComponent;