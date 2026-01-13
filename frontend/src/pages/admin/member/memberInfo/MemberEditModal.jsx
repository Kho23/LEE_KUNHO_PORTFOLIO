import React, { useState } from "react";
import { modifyMemberInfo } from "../../../../api/adminApi";
import AlertModalComponent from "../../../../components/alertModal/AlertModalComponent";

const MemberEditModal = ({ member, onClose }) => {
  // 전달받은 회원 정보를 기반으로 수정 폼 초기값 설정
  const [form, setForm] = useState({
    memberId: member.memberId,
    memberName: member.memberName,
    memberLoginId: member.memberLoginId,
    memberEmail: member.memberEmail,
    memberPhoneNumber: member.memberPhoneNumber,
    memberAddress: member.memberAddress,
    memberDetailAddress: member.memberDetailAddress,
    memberGender: member.memberGender,
    memberBirthDate: member.memberBirthDate?.split("T")[0],
    memberRole: member.memberRole,
  });

  // 수정 완료 알림 모달 열림 여부
  const [modalOpen, setModalOpen] = useState(false);

  // 입력값 변경 시 form 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 회원 정보 수정 요청 처리
  const handleSubmit = () => {
    try {
      const f = async () => {
        // 회원 정보 수정 API 호출
        await modifyMemberInfo(form);
        // 수정 완료 알림 모달 표시
        setModalOpen(true);
      };
      f();
    } catch (error) {
      console.error("정보수정 실패", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-8 space-y-6 transform transition-all duration-300 scale-100">
        <div className="border-b pb-4">
          <h2 className="text-2xl font-extrabold text-gray-800">
            회원 정보 수정
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            회원님의 상세 정보를 확인하고 수정할 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              이름
            </label>
            <input
              className="border border-gray-300 p-3 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              name="memberName"
              placeholder="이름을 입력하세요"
              value={form.memberName}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">ID</label>
            <input
              className="border border-gray-300 p-3 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              name="memberLoginId"
              placeholder="로그인 ID"
              value={form.memberLoginId}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-1">
              이메일
            </label>
            <input
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              name="memberEmail"
              value={form.memberEmail}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-1">
              전화번호
            </label>
            <input
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              name="memberPhoneNumber"
              placeholder="010-XXXX-XXXX"
              value={form.memberPhoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-1">
              주소
            </label>
            <input
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              name="memberAddress"
              placeholder="주소"
              value={form.memberAddress}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-1">
              주소
            </label>
            <input
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              name="memberAddress"
              placeholder="상세 주소"
              value={form.memberDetailAddress}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              성별
            </label>
            <select
              className="border border-gray-300 p-3 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 appearance-none"
              name="memberGender"
              value={form.memberGender}
              onChange={handleChange}
            >
              <option value="Male">남성</option>
              <option value="Female">여성</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              생년월일
            </label>
            <input
              type="date"
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              name="memberBirthDate"
              value={form.memberBirthDate}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-1">
              회원 역할
            </label>
            <select
              name="memberRole"
              className="border border-gray-300 p-3 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 appearance-none"
              value={form.memberRole}
              onChange={handleChange}
            >
              <option value="ROLE_USER">일반 회원</option>
              <option value="ROLE_PARTNER">파트너 회원</option>
              <option value="ROLE_ADMIN">관리자</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 transition duration-150"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg shadow-blue-500/50 hover:bg-blue-700 transition duration-150"
            onClick={handleSubmit}
          >
            정보 수정
          </button>
        </div>
      </div>

      {modalOpen && (
        <AlertModalComponent
          message={"회원 정보가 수정되었습니다."}
          type="alert"
          onConfirm={() => {
            setModalOpen(false);
            onClose();
            window.location.reload();
          }}
        />
      )}
    </div>
  );
};

export default MemberEditModal;
