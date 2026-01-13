import React from "react";
import { Link } from "react-router-dom";

const ProgramListPageComponent = ({ data, programId }) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <main className="flex-1">
        <nav className="text-sm text-gray-500 mb-6">
          홈 &gt; 프로그램 안내 &gt; {data?.programName ?? ""}
        </nav>
        <div className="flex items-end justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.programName ?? ""}프로그램 안내
          </h1>
        </div>
        <div className="border-b-2 border-gray-400 mb-6" />

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 min-h-[300px]">
          {data && (
            <div className="mt-5 space-y-10">
              {data?.uploadFiles?.map((i) => (
                <div key={i.fileId} className="max-w-[900px] mx-auto mb-10">
                  <img
                    alt={i.fileName}
                    src={`/${i.filePath.slice(7)}`}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                  <p className=" text-center text-sm text-gray-600"></p>
                </div>
              ))}
            </div>
          )}
          <article
            className="
                prose max-w-none 
                prose-h2:text-xl
                prose-h3:text-lg
                prose-p:text-gray-700
                prose-li:text-gray-700
                ck-content
              "
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </main>
    </div>
  );
};

export default ProgramListPageComponent;
