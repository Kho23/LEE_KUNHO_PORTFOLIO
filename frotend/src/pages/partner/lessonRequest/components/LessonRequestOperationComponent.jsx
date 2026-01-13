import React from "react";

const LessonRequestOperationComponent = ({ form, formChangeHandler }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-10">
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-900 inline-block pb-1">
          강좌 신청
        </h2>
      </div>

      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          1. 인원
        </h3>

        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-semibold w-28">
            최소 개설 인원
          </label>

          <input
            id="minPeople"
            name="minPeople"
            value={form.minPeople}
            min={1}
            onChange={(e) => formChangeHandler(e)}
            className="
                w-28
                border border-gray-300 
                rounded-lg 
                p-2.5 
                text-gray-800 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-200 
                focus:border-blue-500
                text-right
                transition
              "
            placeholder="0"
          />

          <span className="text-gray-600 text-sm">명</span>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <label className="text-gray-700 font-semibold w-8">정원</label>

          <input
            id="maxPeople"
            name="maxPeople"
            value={form.maxPeople}
            max={100}
            onChange={(e) => formChangeHandler(e)}
            className="
                w-28
                border border-gray-300 
                rounded-lg 
                p-2.5 
                text-gray-800 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-200 
                focus:border-blue-500
                text-right
                transition
              "
            placeholder="0"
          />
          <span className="text-gray-600 text-sm">명</span>
        </div>
      </section>
    </div>
  );
};

export default LessonRequestOperationComponent;
