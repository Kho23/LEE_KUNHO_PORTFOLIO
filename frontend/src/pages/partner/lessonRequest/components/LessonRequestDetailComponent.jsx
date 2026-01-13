import React from "react";

const LessonRequestDetailComponent = ({ form, formChangeHandler }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-10">
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-900 inline-block pb-1">
          강좌 신청
        </h2>
      </div>

      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          1. 강의 설명
        </h3>

        <textarea
          maxLength={100}
          name="description"
          value={form?.description}
          onChange={(e) => formChangeHandler(e)}
          className="
            w-full 
            h-32
            resize-none       
            p-4 
            rounded-lg 
            border border-gray-300 
            bg-white 
            text-gray-800 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-200 
            focus:border-blue-500 
            transition
        "
          placeholder="강의 내용을 입력하세요"
        />
        <p className="text-right text-sm text-gray-500 mt-1">
          {form?.description?.length} / 100자
        </p>
      </section>

      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          2. 강의 준비물
        </h3>

        <textarea
          maxLength={100}
          name="tools"
          value={form.tools}
          onChange={(e) => formChangeHandler(e)}
          className="
            w-full 
            h-32
            resize-none       
            p-4 
            rounded-lg 
            border border-gray-300 
            bg-white 
            text-gray-800 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-200 
            focus:border-blue-500 
            transition
        "
          placeholder="강의 준비물을 입력하세요"
        />
        <p className="text-right text-sm text-gray-500 mt-1">
          {form?.tools?.length} / 100자
        </p>
      </section>

      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          3. 강의 특이사항
        </h3>

        <textarea
          maxLength={100}
          name="memo"
          value={form?.memo}
          onChange={(e) => formChangeHandler(e)}
          className="
            w-full 
            h-32
            resize-none       
            p-4 
            rounded-lg 
            border border-gray-300 
            bg-white 
            text-gray-800 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-200 
            focus:border-blue-500 
            transition
        "
          placeholder="강의 준비물을 입력하세요"
        />
        <p className="text-right text-sm text-gray-500 mt-1">
          {form.memo?.length} / 100자
        </p>
      </section>

      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          4. 강의 커리큘럼
        </h3>

        <textarea
          maxLength={100}
          name="curriculum"
          value={form?.curriculum}
          onChange={(e) => formChangeHandler(e)}
          className="
            w-full  
            h-32
            resize-none       
            p-4 
            rounded-lg 
            border border-gray-300 
            bg-white 
            text-gray-800 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-200 
            focus:border-blue-500 
            transition
        "
          placeholder="강의 내용을 입력하세요"
        />
        <p className="text-right text-sm text-gray-500 mt-1">
          {form?.curriculum?.length} / 100자
        </p>
      </section>
    </div>
  );
};

export default LessonRequestDetailComponent;
