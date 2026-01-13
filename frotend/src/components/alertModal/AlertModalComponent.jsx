import React from "react";

const ModalComponent = ({
  message,
  type = "", // "alert" | "confirm"
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* 내용 */}
        <div className="p-6 sm:p-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <p className="text-sm text-gray-500 text-center">{message}</p>
        </div>

        {/* 버튼 */}
        <div className="px-4 py-3 bg-gray-50 sm:px-6 flex gap-3">
          <button
            type="button"
            className="flex-1 rounded-md px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => onConfirm?.("ok")}
          >
            확인
          </button>

          {type === "confirm" && (
            <button
              type="button"
              className="flex-1 rounded-md border px-4 py-2 bg-white text-gray-700 hover:bg-gray-100"
              onClick={() => onConfirm?.("cancel")}
            >
              취소
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
