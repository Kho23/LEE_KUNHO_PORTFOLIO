import React, { useState } from "react";
import { Link } from "react-router-dom";
import AlertModalComponent from "../../../../../components/alertModal/AlertModalComponent";

const PartnerRequestListComponent = ({
  data,
  renderStatus,
  statusChangeHandler,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null); // "ACCEPTED" | "REJECTED"

  return (
    <div className="container mx-auto max-w-4xl p-8 min-h-screen text-gray-900">
      {/* 제목 */}
      <h1 className="text-3xl font-bold mb-10 border-b pb-4">
        파트너 승급 신청서
      </h1>

      {/* 기본 정보 */}
      <div className="bg-white shadow-lg rounded-xl border p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-black">기본 정보</h2>
        <table className="w-full border rounded-lg text-sm">
          <tbody className="divide-y">
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3 w-36">
                아이디
              </td>
              <td className="px-4 py-3">{data.member?.memberLoginId}</td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">신청자</td>
              <td className="px-4 py-3">{data.member?.memberName}</td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">성별</td>
              <td className="px-4 py-3">{data.member?.memberGender}</td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">생년월일</td>
              <td className="px-4 py-3">
                {data.member?.memberBirthDate?.slice(0, 10)}
              </td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">
                핸드폰 번호
              </td>
              <td className="px-4 py-3">{data.member?.memberPhoneNumber}</td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">신청일</td>
              <td className="px-4 py-3">
                {new Date(data.requestDate).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">신청 상태</td>
              <td className="px-4 py-3">{renderStatus(data.status)}</td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">신청 종목</td>
              <td className="px-4 py-3">{data.partnerClass?.join(", ")}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 파일 */}
      <div className="bg-white shadow-lg rounded-xl border p-6">
        <h2 className="text-xl font-semibold text-black mb-6">제출한 파일</h2>

        <div className="space-y-10">
          {[
            { title: "이력서", list: data.resumeFiles },
            { title: "자격증", list: data.certFiles },
            { title: "통장 사본", list: data.bankFiles },
          ]
            .filter((item) => item.list && item.list.length > 0)
            .map((section, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-semibold mb-3 border-b pb-1">
                  {section.title}
                </h3>
                <table className="w-full text-sm rounded-xl overflow-hidden">
                  <tbody>
                    {section.list.map((file) => (
                      <tr
                        key={file.fileId}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3">{file.originalName}</td>
                        <td className="px-4 py-3 text-right">
                          <a
                            href={`/download/${file.savedName}`}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-lg"
                          >
                            다운로드
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
        </div>
      </div>

      {/* 승인 / 반려 버튼 */}
      {data.status === "PENDING" && (
        <div className="mt-10 flex justify-center gap-20">
          <button
            className="px-16 py-3 rounded-lg font-semibold
              border-2 border-green-500 text-green-600
              hover:bg-green-500 hover:text-white transition"
            onClick={() => {
              setPendingStatus("ACCEPTED");
              setConfirmOpen(true);
            }}
          >
            승 인
          </button>

          <button
            className="px-16 py-3 rounded-lg font-semibold
              border-2 border-red-500 text-red-600
              hover:bg-red-500 hover:text-white transition"
            onClick={() => {
              setPendingStatus("REJECTED");
              setConfirmOpen(true);
            }}
          >
            반 려
          </button>
        </div>
      )}

      {/* 목록 */}
      <div className="flex justify-end mt-5 gap-x-4 border-t">
        <Link
          to={-1}
          className="bg-gray-700 text-white font-bold py-2 px-6 mt-5 rounded hover:bg-gray-800"
        >
          목록
        </Link>
      </div>

      {/* confirm 모달 */}
      {confirmOpen && (
        <AlertModalComponent
          type="confirm"
          message={
            pendingStatus === "ACCEPTED"
              ? "승인하시겠습니까?"
              : "반려하시겠습니까?"
          }
          onConfirm={(result) => {
            if (result === "ok") {
              statusChangeHandler(pendingStatus);
            }
            setConfirmOpen(false);
            setPendingStatus(null);
          }}
        />
      )}
    </div>
  );
};

export default PartnerRequestListComponent;
