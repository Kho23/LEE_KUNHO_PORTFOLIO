import React, { useEffect, useState } from "react";
import { getFaqList, getFaqCategory } from "../../../../api/faqApi";
import { createFaq, updateFaq, deleteFaq } from "../../../../api/adminApi";
import FaqListComponent from "./FaqListComponent";
import ModalComponent from "../../../../components/alertModal/AlertModalComponent";

const FaqListPage = () => {
  // FAQ 목록 데이터를 저장하는 상태
  const [faqs, setFaqs] = useState([]);
  // FAQ 카테고리 목록을 저장하는 상태
  const [categories, setCategories] = useState([]);
  // FAQ 등록/수정 모달의 열림 여부를 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 현재 선택된 FAQ (수정 시 사용)
  const [currentFaq, setCurrentFaq] = useState(null);

  // FAQ 등록/수정 시 입력 폼 데이터를 관리
  const [data, setData] = useState({
    faqCategoryId: "",
    question: "",
    answer: "",
  });

  // 알림/확인 모달의 상태를 관리
  const [modal, setModal] = useState({
    open: false,
    message: "",
    type: "alert",
    onConfirm: null,
  });

  // 메시지 모달을 열기 위한 공통 함수
  const openMessageModal = ({ message, type = "alert", onConfirm }) => {
    setModal({ open: true, message, type, onConfirm });
  };

  // 메시지 모달을 닫는 함수
  const closeMessageModal = () => {
    setModal({ ...modal, open: false });
  };

  // 최초 렌더링 시 FAQ 목록과 카테고리 목록을 조회
  useEffect(() => {
    const f = async () => {
      try {
        const faqData = await getFaqList();
        const categoryData = await getFaqCategory();
        setFaqs(faqData);
        setCategories(categoryData);
      } catch {
        // 데이터 조회 실패 시 알림 표시
        openMessageModal({ message: "데이터 로딩 실패" });
      }
    };
    f();
  }, []);

  // FAQ 등록 또는 수정 모달을 여는 함수
  const openModal = (faq) => {
    if (faq) {
      // 수정인 경우 기존 FAQ 데이터를 폼에 세팅
      setCurrentFaq(faq);
      setData({
        faqCategoryId: faq.faqCategoryId,
        question: faq.question,
        answer: faq.answer,
      });
    } else {
      // 신규 등록인 경우 초기값 세팅
      setCurrentFaq(null);
      setData({
        faqCategoryId: categories[0]?.faqCategoryId || "",
        question: "",
        answer: "",
      });
    }
    setIsModalOpen(true);
  };

  // FAQ 삭제 처리 함수
  const handleDelete = (faqId) => {
    // 삭제 여부를 묻는 확인 모달 표시
    openMessageModal({
      message: "정말로 이 FAQ를 삭제하시겠습니까?",
      type: "confirm",
      onConfirm: async (result) => {
        if (result === "ok") {
          try {
            await deleteFaq(faqId);
            // 삭제 성공 시 목록에서 해당 FAQ 제거
            setFaqs((prev) => prev.filter((f) => f.faqId != faqId));
            openMessageModal({
              message: "삭제되었습니다.",
            });
          } catch {
            // 삭제 중 오류 발생 시 알림
            openMessageModal({ message: "삭제 중 오류가 발생했습니다." });
          }
        }
      },
    });
  };

  // FAQ 저장(등록/수정) 처리 함수
  const handleSave = async () => {
    // 필수 입력값 검증
    if (!data.question || !data.answer) {
      openMessageModal({ message: "질문과 답변을 모두 입력해주세요." });
      return;
    }

    if (!data.faqCategoryId) {
      openMessageModal({ message: "카테고리를 선택해주세요." });
      return;
    }

    try {
      if (currentFaq) {
        // 수정인 경우 FAQ 업데이트
        await updateFaq(currentFaq.faqId, data);
        openMessageModal({
          message: "수정되었습니다.",
          onConfirm: () => window.location.reload(),
        });
      } else {
        // 신규 등록인 경우 FAQ 생성
        await createFaq(data);
        openMessageModal({
          message: "등록되었습니다.",
          onConfirm: () => window.location.reload(),
        });
      }
      setIsModalOpen(false);
    } catch {
      // 저장 중 오류 발생 시 알림
      openMessageModal({ message: "저장 중 오류가 발생했습니다." });
    }
  };

  // 입력 폼 변경 시 data 상태를 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <FaqListComponent
        openModal={openModal}
        faqs={faqs}
        handleDelete={handleDelete}
        isModalOpen={isModalOpen}
        currentFaq={currentFaq}
        data={data}
        handleChange={handleChange}
        categories={categories}
        setIsModalOpen={setIsModalOpen}
        handleSave={handleSave}
      />

      {modal.open && (
        <ModalComponent
          message={modal.message}
          type={modal.type}
          onConfirm={(result) => {
            modal.onConfirm?.(result);
            closeMessageModal();
          }}
        />
      )}
    </>
  );
};

export default FaqListPage;
